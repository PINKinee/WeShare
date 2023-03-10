<template>
  <div class="header">
    <div class="leftt">
      <span class="iconfont icon-jiantouyou left_span" title="打开文件夹" @click="changeState($event)">
      </span>
      <input type="text" placeholder="输入文件标题…" ref="input" />
      <btn :content="'修改名称'" @click="updateName"></btn>
    </div>
    <div class="rightt">
      <span class="nameSpace">创建者:{{ createrMsg.userName }}</span>
      <span class="touxiang" :style="{ background: `url(${uStore.user.portraitPath}) no-repeat` }"
        :title="uStore.user.userName">
        <ul class="userMeg">
          <li v-for="(item, index) in opt" :key="index" :title="item" @click="selectItem(index)" class="menuLi">
            {{ item }}
          </li>
        </ul>
      </span>
      <button class="iconfont icon-fenxiang" @click="share" title="分享">
        分享
      </button>
      <button class="iconfont icon-baocun" @click="allowFlag && save" title="保存" ref="saveBtn">保存</button>
    </div>
  </div>
  <teleport to="body">
    <div class="whiteMask" v-show="showMask">
      <btn :content="'我要登录'" class="toLogin" @click="setFlag"></btn>
    </div>
  </teleport>
</template>

<script>
import { ref, onMounted, getCurrentInstance,nextTick } from "vue";
import userStore from '@/store/userStore';
import mdStore from '@/store/codemirror';
import artStore from '@/store/articleStore';
import fileStore from '@/store/fileStore';
import { useRoute, useRouter } from 'vue-router';
import { toRaw } from '@vue/reactivity'
import pop from '@/components/pop.vue';
import btn from '@/components/button.vue';
import { storeToRefs } from 'pinia';
import {
  updateContent, addWriter, getAllWriter,
  updateArticleName, deleteJoiner, getArticleMsg
} from '@/api/articleService';
// Y.js
import * as Y from 'yjs'
import { CodemirrorBinding } from 'y-codemirror'
import { WebrtcProvider } from 'y-webrtc'

export default {
  name: "editorHeader",
  components: {
    pop,
    btn
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let input = ref();
    let saveBtn = ref();
    const uStore = userStore();
    const mStore = mdStore();
    const aStore = artStore();
    const fStore = fileStore();
    let { allowFlag } = storeToRefs(aStore);
    const route = useRoute();
    const router = useRouter();
    let showMask = ref(false);
    const state = ref(false);
    let aId = null;
    let createrMsg = {};
    // 控制左侧文件树样板的出现和隐藏
    const changeState = e => {
      if (aStore.createrMsg.userId === uStore.user.userId) {
        state.value = !state.value;
        const mainEdiPlace = document.querySelector(".mainEdiPlace");
        const filesManage = document.querySelector(".filesArea");
        if (state.value) {
          mainEdiPlace.style.left = "16%";
          filesManage.style.left = "0%";
          mainEdiPlace.style.width = "84%";
          e.target.className = "iconfont icon-zuojiantou";
          e.target.title = '关闭文件夹'
        } else {
          mainEdiPlace.style.left = "0%";
          filesManage.style.left = "-16%";
          mainEdiPlace.style.width = "100%";
          e.target.className = "iconfont icon-jiantouyou";
          e.target.title = '打开文件夹'
        }
      } else {
        proxy.$msg.warning('您没有操作权限');
      }
    };
    // 保存功能(文章的缓存直接用localStorage)
    const save = async () => {
      const res = await updateContent({
        articleId: toRaw(route).query.value.articleId,
        articleContent: mStore.editor.getValue()
      })
      if (res.code === 3003) {
        proxy.$msg.success('保存成功');
      }
    }
    // 分享功能(生成链接,可供复制)
    const share = () => {
      console.log(12);
      proxy.$bus.emit('setDisposition', {
        isShow: true,
        title: '分享文章',
        exhibit: [{
          name: `${window.location.href}`
        }],
        exhibitCommand: ['复制'],
        type: "link"
      })
    }
    // 修改文章名称
    const updateName = async () => {
      const res = await updateArticleName({
        articleId: toRaw(route).query.value.articleId,
        articleName: input.value.value,
      })
      if (res.code == 3003) {
        // 缓存,同时触发了页面刷新
        fStore.resetArticleName({
          articleId: toRaw(route).query.value.articleId,
          newName: input.value.value
        });
        proxy.$msg.success(res.message);
      }
    }
    // 下拉菜单功能
    let opt = ref([]);
    const joiner = ['个人中心', '退出登录'];
    const creater = ['个人中心', '退出登录', '我的创建', '我的参与', '添加共享者', '删除共享者'];
    const selectItem = async (index) => {
      switch (index) {
        case 0:
          router.push('/personal');
          break;
        case 1:
          localStorage.removeItem('userStore');
          localStorage.removeItem('token');
          localStorage.removeItem('fileStore');
          proxy.$msg.success('退出登录成功');
          router.push('/login');
          break;
        case 2:
          // 因为这个地方没有接口,直接用本地数据(每次新建一篇文章就push一个信息对象进去)
          const arr = uStore.createArticleList;
          console.log(arr);
          proxy.$bus.emit('setDisposition', {
            isShow: true,
            title: '我创建的文章列表',
            // 本地的数据
            exhibit: arr,
            exhibitCommand: '查看',
            type: "myCreate"
          })
          proxy.$bus.on('exhibit', async ({ value, type }) => {
            if (type === 'myCreate') {
              const res = await getArticleContent({
                articleId: value
              })
              console.log(res);
              // 要重新渲染页面,同时hash值也要修改() 直接使用watchEffect()监听本地数据
              watchEffect()
            }
          })
          break;
        case 3:
          // 我参与的文章列表比较难做缓存(因为别人添加共享者的时候自己可能不知道)
          let list = [];
          if (!uStore.joinArticleList.length) {
            const res = await getJoinArticleList();
            console.log(res);
            // 将数据存到本地
            // 缓存:一开始为0,每次上传共享者接口时
            // list=res.data;
          } else {
            list = uStore.joinArticleList;
            console.log(list);
          }
          proxy.$bus.emit('setDisposition', {
            isShow: true,
            title: '我参与的文章列表',
            exhibit: list,
            exhibitCommand: '查看',
            type: "myJoin"
          })
          proxy.$bus.on('exhibit', async ({ value, type }) => {
            if (type === 'myJoin') {
              const res = await getArticleContent({
                articleId: value
              })
              console.log(res);
              // 要重新渲染页面,同时hash值也要修改
            }
          })
          break;
          break;
        case 4:
          // 可以做缓存,就是participants这个数据
          proxy.$bus.emit('setDisposition', {
            isShow: true,
            title: '添加共享者',
            input: true,
            placeHolder: '请输入共享者邮箱',
            type: "share"
          })
          proxy.$bus.on('inputContent', async ({ value, type }) => {
            if (type === 'share') {
              const res = await addWriter({
                articleId: toRaw(route).query.value.articleId,
                userEmail: value
              })
              console.log(res);
              // 状态码到时候看看是多少
              if (res.code) {
                proxy.$msg.success('添加成功');
              }
            }
          })
          break;
        case 5:
          // 由于删除共享者要传入的是userId,因此必须先渲染所有的参与者,然后供创建者挑选
          proxy.$bus.emit('setDisposition', {
            isShow: true,
            title: '删除共享者',
            // 参与者列表(若本地存在直接用participants,不存在才请求),请求之后对数据处理成弹窗内定义的格式
            exhibit: [],
            exhibitCommand: '删除',
            type: "delete"
          })
          proxy.$bus.on('exhibit', async ({ userId }) => {
            if (type === 'delete') {
              // 调用删除共享者接口
              const res = await deleteJoiner({
                articleId: toRaw(route).query.value.articleId,
                userId: userId
              })
              console.log(res);
              if (res.code) {
                proxy.$msg.success('删除成功');
                // 记得更新本地的数据
                // 这里要用watcEffect让页面刷新(删除了要立刻体现出来)
              }
            }
          })
      }
    }

    // 按钮设置标识
    const setFlag = () => {
      sessionStorage.setItem('enterByLink', true);
      router.push('/login');
    }

    const bindingYjs = () => {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider('weShareMd', ydoc, {
        signaling: ['ws:localhost:4444'],
        filterBcConns: true
      });
      const yText = ydoc.getText('codemirror');
      const yUndoManager = new Y.UndoManager(yText);
      const binding = new CodemirrorBinding(yText, mStore.editor, provider.awareness, {
        yUndoManager
      });
      binding.awareness.setLocalStateField('user',
        { color: 'skyblue', name: uStore.user.userName }
      )

    }

    onMounted(async () => {
      const token = localStorage.getItem('token');
      if ((token === '' || token === null)) {
        nextTick(() => {
          proxy.$bus.emit('setDisposition', {
            isShow: true,
            title: '登录提示',
            content: '登录后才能操作哦！',
            input: false,
            type: "auth",
          })
          proxy.$bus.on('spanContent', ({ value, type }) => {
            if (type === 'auth') {
              if (value.sure) {
                router.push('/login');
                // 使用sessionStorage保证分屏时每个页面的数据不同,使用localStorage会被覆盖
                // 同时使用sessionStorage保证刷新之后不影响结果
                sessionStorage.setItem('enterByLink', true);
              } else {
                showMask.value = true;
                sessionStorage.setItem('enterByLink', false);
              }
            }
          })
        })
      } else {
        // 初始化操作:页面功能解禁
        allowFlag.value = true;
        input.value.disabled = false;
        nextTick(() => toRaw(mStore.editor).setOption("readOnly", false));
        const res = await getArticleMsg(toRaw(route).query.value.articleId);
        // 已登录但没有权限的人(这里没有编辑权限的人应该也要可以阅读:即res.data应该要返回)
        if (res.data === null) {
          opt.value = proletariat;
          // 没有权限:页面功能禁用
          nextTick(() => mStore.editor.setOption("readOnly", true))
          input.value.disabled = true;
          allowFlag.value = false;
          document.querySelector('.tool').childNodes.forEach(ele => ele.onclick = () => {
            proxy.$msg.warning('您没有操作权限');
          })
          document.querySelector('.richText-left').onclick = () => proxy.$msg.warning('您没有操作权限');
          document.querySelector('.special').onclick = e => {
            e.preventDefault();
            proxy.$msg.warning('您没有操作权限');
          };
          saveBtn.value.onclick = () => proxy.$msg.warning('您没有操作权限');
        } else {
          // 有权限的进一步请求数据存储到本地
          const { data } = await getAllWriter(toRaw(route).query.value.articleId);
          // 存储文章详细信息(如内容等)
          aStore.setCurArticleMsg(res.data);
          // 存储创建者信息
          aStore.setCreaterMsg(data.create);
          // 存储参与者信息(后续需要在请求里调整该数据)
          aStore.setParticipants(data.list);
          input.value.value = aStore.curArticleMsg.articleName;
          // 最后分类讨论:创建者 协作者
          if (aStore.createrMsg.userId === uStore.user.userId) {
            opt.value = creater;

          } else if (aStore.participants.indexOf(uStore.user.userId) !== -1) {
            opt.value = proletariat;
          }
          nextTick(() => {
            mStore.editor.setValue(JSON.stringify(JSON.parse(res.data.articleContent)));
            const ydoc = new Y.Doc();
            const provider = new WebrtcProvider('weShareMd', ydoc, {
              signaling: ['ws:localhost:4444'],
              filterBcConns: true
            });
            const yText = ydoc.getText('codemirror');
            const yUndoManager = new Y.UndoManager(yText);
            const bindingYjs = new CodemirrorBinding(yText, mStore.editor, provider.awareness, {
              yUndoManager
            });
            bindingYjs.awareness.setLocalStateField('user',
              { color: 'skyblue', name: uStore.user.userName }
            )
          })
        }
      }
    })
      // 修改版代码 基本可用
      // if ((token === '' || token === null)) {
      //   nextTick(() => {
      //     proxy.$bus.emit('setDisposition', {
      //       isShow: true,
      //       title: '登录提示',
      //       content: '登录后才能操作哦！',
      //       input: false,
      //       type: "auth",
      //     })
      //     proxy.$bus.on('spanContent', ({ value, type }) => {
      //       if (type === 'auth') {
      //         if (value.sure) {
      //           router.push('/login');
      //           // 使用sessionStorage保证分屏时每个页面的数据不同,使用localStorage会被覆盖
      //           // 同时使用sessionStorage保证刷新之后不影响结果
      //           sessionStorage.setItem('enterByLink', true);
      //         } else {
      //           showMask.value = true;
      //           sessionStorage.setItem('enterByLink', false);
      //         }
      //       }
      //     })
      //   })
      // } else {
      //   aId = toRaw(route).query.value.articleId;
      //   const { data: { create, list } } = await getAllWriter(aId);
      //   const { data } = await getArticleMsg(aId);
      //   createrMsg = create;
      //   // 渲染页面
      //   opt.value = joiner;
      //   nextTick(() => mStore.editor.setValue(JSON.stringify(data.articleContent)));
      //   input.value.value = data.articleName;  // 也可以用v-model
      //   // 页面功能解禁(有持久化的必须每次都初始化)
      //   allowFlag.value = true;
      //   nextTick(() => mStore.editor.setOption("readOnly", true));
      //   // 创建者
      //   if (createrMsg.userId === uStore.user.userId) {
      //     opt.value = creater;
      //     nextTick(() => bindingYjs())
      //   }
      //   // 协作者
      //   else if (list.indexOf(uStore.user.userId) !== -1) {
      //     nextTick(() => bindingYjs())
      //   }
      //   // 已登录的游客
      //   else {
      //     // 没有编辑和操作权限:页面功能禁用
      //     nextTick(() => mStore.editor.setOption("readOnly", true))
      //     input.value.disabled = true;
      //     allowFlag.value = false;
      //     document.querySelector('.tool').childNodes.forEach(ele => ele.onclick = () => {
      //       proxy.$msg.warning('您没有操作权限');
      //     })
      //     document.querySelector('.richText-left').onclick = () => proxy.$msg.warning('您没有操作权限');
      //     document.querySelector('.special').onclick = e => {
      //       e.preventDefault();
      //       proxy.$msg.warning('您没有操作权限');
      //     };
      //     saveBtn.value.onclick = () => proxy.$msg.warning('您没有操作权限');
      //   }
      // }
      return {
        createrMsg,
        state,
        input,
        uStore,
        opt,
        showMask,
        saveBtn,
        allowFlag,
        save,
        share,
        changeState,
        updateName,
        selectItem,
        setFlag,
        bindingYjs,
      };
  }
}
</script>

<style lang="less" scoped>
// @avator: ~`user.portraitPath`;

li {
  list-style: none;
  cursor: pointer;
}

.header {
  width: 100%;
  min-width: 1200px;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  overflow: visible;

  .leftt {
    display: inline-block;
    width: 50%;
    height: 100%;

    span {
      float: left;
      width: 80px;
      height: 100%;
      line-height: 270%;
      margin-right: 30px;
      text-align: center;
      cursor: pointer;
      font-size: 30px;
      color: #86909c;
    }

    input {
      float: left;
      width: 60%;
      height: 100%;
      font-size: 25px;
      border: none;
      margin-right: 30px;
      color: black;
      background-color: transparent;
    }

    button {
      transform: scale(.8);
    }
  }

  .rightt {
    display: inline-block;
    width: 50%;
    height: 100%;
    overflow: visible;

    .nameSpace {
      position: absolute;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      color: black;
      letter-spacing: 2px;
      margin-right: 15px;
    }

    button {
      float: right;
      position: relative;
      width: 100px;
      height: 50px;
      border: 2px solid #1d7dfa;
      border-radius: 10px;
      margin-right: 30px;
      background: none;
      font-size: 20px;
      color: #1d7dfa;
      margin-top: 16px;
      cursor: pointer;
    }

    .touxiang {
      position: relative;
      float: right;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      border: 1px solid #eee;
      margin-top: 10px;
      margin-right: 70px;
      background-size: 60px;
      overflow: visible !important;

      ul {
        position: absolute;
        width: 160px;
        top: 70px;
        left: -50px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        z-index: 100;
        display: none;

        li {
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          text-align: center;
          background-color: #fff;
          z-index: inherit;
          color: #86909c;

          &:not(:last-child) {
            border-bottom: 2px solid #eee;
            border-radius: 10px 10px 0 0;
          }

          &:last-child {
            border-radius: 0 0 10px 10px;
          }

          &:hover {
            color: #1d7dfa;
          }
        }

        &::before {
          content: "";
          position: absolute;
          display: inline-block;
          top: -20px;
          left: calc(50% - 10px);
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-bottom-color: #fff;
        }
      }

      &:hover ul {
        display: block;
        overflow: visible !important;
      }
    }
  }
}

.whiteMask {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .5);

  .toLogin {
    z-index: 2000;
  }
}

.eventNone {
  pointer-events: none;
}

.move {
  margin-left: 80px;
}
</style>