<template>
  <ul class="container" ref="container" @mousedown="rightClick($event)">
    <div class="progressBox">
      <img src="@/assets/images/gress.png" />
      <pace class="progress" :progress="progress"></pace>
    </div>
    <li class="first">
      <span>文件名称</span>
      <span>最近修改时间</span>
      <span>文件类型</span>
    </li>
    <!-- dbclick感觉要加在li上 -->
    <li
      class="flag"
      v-for="(item, index) in curPageData"
      @mouseenter.self="selected"
      @mouseleave.self="nonSelect"
      @mousedown="changeOperate($event, item)"
      @dblclick.stop="getNextFile(item)"
      :key="index"
    >
      <p class="flag">
        <img
          :src="
            item.folderId
              ? require('@/assets/images/folder.png')
              : require('@/assets/images/md.png')
          "
          class="flag"
        />
        <span class="flag">
          <!-- 要不就在这加.md -->
          {{ item.folderName ? item.folderName : item.articleName }}
        </span>
      </p>
      <!-- 这个时间是该文件夹内的文章最近点击保存的那一刻得到的时间 -->
      <!-- 使用变量数组 用watch监听 -->
      <p class="flag">{{ item.time }}</p>
      <p class="flag">{{ item.folderName ? "文件夹" : "文件" }}</p>
    </li>
  </ul>
  <!-- to="container"可以避免放大缩小时坐标不准的问题,同时坐标计算要重设 -->
  <teleport to="body">
    <menuList
      :operate="operate"
      class="menuList"
      v-show="isShow"
      :style="{
        top: `${point.y}px`,
        left: `${point.x}px`,
        height: `${operate.length * 40}px`,
      }"
      @click.stop="selectItem($event)"
    >
    </menuList>
  </teleport>
</template>

<script>
import { onMounted, ref, getCurrentInstance, reactive, watchEffect } from "vue";
import {
  getNext,
  newFolder,
  deleteFile,
  updateFolderName,
} from "@/api/fileService";
import {
  newArticle,
  updateArticleName,
  deleteArticle,
} from "@/api/articleService";
import userStore from "@/store/userStore";
import fileStore from "@/store/fileStore";
import menuList from "@/components/menu.vue";
import pace from "@/components/pace.vue";
import { dataHandler } from "@/utils/check";
import { toRaw } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// import articleStore from '@/store/articleStore';
export default {
  name: "perFile",
  components: {
    menuList,
    pace,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const uStore = userStore();
    const fStore = fileStore();
    // const aStore = articleStore();
    // 控制菜单位置的变量
    let point = reactive({ x: 0, y: 0 });
    // 控制菜单显示与隐藏的变量
    let isShow = ref(false);
    const container = ref();
    // 记录当前鼠标右键的id和类型
    let rightClickId = -1;
    let rightClickType = "";
    // localTotalData:本地缓存 recentVisitList:最近访问
    let { recentVisitList, visitLen, localTotalData } = fStore;
    // depth:页面层级 fId:当前点击文件夹id father:当前点击文件夹的父id
    // progress:进度条数据 curPageData:当前页面数据
    let { progress, curPageData, fId, depth, father } = storeToRefs(fStore);
    onMounted(async () => {
      // 参数初始化
      // 直接解构修改没有响应式，改用actions修改
      // 使用actions中的方法修改其值具有响应式但是是异步的
      // 使用toRefs既具有响应式又是同步的
      // 1.同步异步
      // 2.能修改pinia中的数据
      depth.value = 0;
      fId.value = uStore.user.userId;
      father.value = null;
      progress.value = [];
      recentVisitList.length = visitLen;
      if (!toRaw(localTotalData)[fId.value]) {
        let {
          data: { folderList: fL, articleList: aL },
        } = await getNext(fId.value);
        toRaw(localTotalData)[fId.value] = {
          father: father.value,
          children: dataHandler(fL, aL),
        };
      }
      curPageData.value = [...toRaw(localTotalData[fId.value]).children];
      const notHot = fStore.updateRecentVisitList(fId.value);
      notHot !== null ? delete toRaw(localTotalData)[notHot] : null;
      // 监听当前页面数组,数据变化时页面刷新
      watchEffect(() => curPageData.value);
      // 禁用原右键菜单
      document.oncontextmenu = (e) => e.preventDefault();
      // 点击body将自定义菜单隐藏
      document.onclick = () =>
        isShow.value === true ? (isShow.value = false) : null;
      // 容器滚动将自定义菜单隐藏
      document.querySelector(".right").onscroll = () => (isShow.value = false);
    });

    // 鼠标进出目标文件区域增删类名
    const selected = (e) => e.target.classList.add("selected");
    const nonSelect = (e) => e.target.classList.remove("selected");

    // 右键清单
    const oriOperate = [{ name: "新建文章" }, { name: "新建文件夹" }];
    const fileOperate = [
      { name: "重命名" },
      { name: "删除" },
      { name: "另存为" },
    ];
    const operate = ref(oriOperate);
    // 鼠标在文件区域内右键时改变菜单项目,同时记录当前右键文件的id和类型
    const changeOperate = (e, item) => {
      e.button === 2 ? (operate.value = fileOperate) : null;
      rightClickId = toRaw(item).id;
      rightClickType = toRaw(item).type;
    };
    // 右键控制自定义清单的显示和隐藏
    const rightClick = (e) => {
      if (e.button === 2) {
        // 点击的位置不在文件夹/文章区域时菜单项目换为原项目
        !e.target.classList.contains("flag")
          ? (operate.value = oriOperate)
          : null;
        isShow.value = true;
        point.x = e.clientX;
        point.y = e.clientY;
      } else {
        isShow.value = false;
      }
    };
    // 双击进入下一级
    const getNextFile = async (item) => {
      const rawItem = toRaw(item);
      // 若点击的是文件夹
      if (rawItem.folderId) {
        // 层级+1
        depth.value++;
        // 存储当前文件夹的id和他的父亲的id
        fId.value = rawItem.folderId;
        father.value = rawItem.fatherFolderId;
        if (!toRaw(localTotalData)[fId.value]) {
          let {
            data: { folderList: fL, articleList: aL },
          } = await getNext(fId.value);
          toRaw(localTotalData)[fId.value] = {
            father: father.value,
            children: dataHandler(fL, aL),
          };
        }
        curPageData.value = [...toRaw(localTotalData)[fId.value].children];
        const notHot = fStore.updateRecentVisitList(fId.value);
        notHot !== null ? delete toRaw(localTotalData)[notHot] : null;
        // 进度条数据+1
        progress.value.push({
          folderId: rawItem.folderId,
          folderName: rawItem.folderName,
          father: rawItem.fatherFolderId,
        });
      }
      // 若点击的是文章
      else {
        router.push({
          path: "/editorPage",
          query: {
            articleId: rawItem.articleId,
          },
        });
      }
    };

    // 创建文章
    const addArticle = (id) => {
      proxy.$bus.emit("setDisposition", {
        isShow: true,
        title: "新建文章",
        input: true,
        placeHolder: "请输入文章名称",
        type: "file",
      });
      proxy.$bus.on("inputContent", async ({ type, value }) => {
        if (type === "file") {
          const { message, data, code } = await newArticle({
            fatherFolderId: id,
            articleName: value,
          });
          if (code === 3004) {
            const { articleId } = JSON.parse(data);
            // 奕龙给出的没有userId,即默认没有根文章的用法
            const obj = {
              fatherFolderId: id,
              id: articleId,
              type: "article",
              articleId: articleId,
              articleName: value + ".md",
              time: new Date().toLocaleString(),
            };
            toRaw(localTotalData)[id].children.push(obj);
            // 触发watchEffect
            curPageData.value = [...toRaw(localTotalData)[id].children];
            // 缓存用户创建的文章列表,由于结构简单,所以直接用数组存储
            uStore.setCreateArticleList(obj);
            proxy.$msg.success(message);
          }
        }
        proxy.$bus.off("inputContent");
      });
    };

    // 创建文件夹
    const addFolder = (opt) => {
      proxy.$bus.emit("setDisposition", {
        isShow: true,
        title: "新建文件夹",
        input: true,
        placeHolder: "请输入文件夹名称",
        type: "folder",
      });
      proxy.$bus.on("inputContent", async ({ type, value }) => {
        if (type === "folder") {
          const { data, message, code } = await newFolder({
            // 经过测试在根部新建文件夹时这个id一定要为null
            fatherFolderId: opt.id,
            folderName: value,
          });
          if (code === 5005) {
            const { folderId } = JSON.parse(data);
            const tId = opt.id === null ? uStore.user.userId : opt.id;
            toRaw(localTotalData)[tId].children.push({
              type: "folder",
              id: folderId,
              fatherFolderId: fId.value,
              folderId: folderId,
              folderName: value,
              time: new Date().toLocaleString(),
              userId: uStore.user.userId,
            });
            curPageData.value = [...toRaw(localTotalData)[tId].children];
            proxy.$msg.success(message);
          }
        }
        proxy.$bus.off("inputContent");
      });
    };

    // 修改文件夹名称
    const resetFolderName = (id) => {
      proxy.$bus.emit("setDisposition", {
        isShow: true,
        title: "重命名",
        input: true,
        placeHolder: "请输入新名称",
        type: "resetNameF",
      });
      proxy.$bus.on("inputContent", async ({ value, type }) => {
        if (type === "resetNameF") {
          const { code, message } = await updateFolderName({
            folderId: id,
            folderName: value,
          });
          if (code == 5002) {
            // 这里是父id
            toRaw(localTotalData)[fId.value].children.forEach((item) =>
              item.folderId === id ? (item.folderName = value) : null
            );
            curPageData.value = [...toRaw(localTotalData)[fId.value].children];
            proxy.$msg.success(message);
            const notHot = fStore.updateRecentVisitList(id);
            notHot !== null ? delete toRaw(localTotalData)[notHot] : null;
          }
        }
      });
    };

    // 修改文章名称
    const resetArticleName = (id) => {
      proxy.$bus.emit("setDisposition", {
        isShow: true,
        title: "重命名",
        input: true,
        placeHolder: "请输入新名称",
        type: "resetNameA",
      });
      proxy.$bus.on("inputContent", async ({ value, type }) => {
        if (type === "resetNameA") {
          const { code, message } = await updateArticleName({
            articleId: id,
            articleName: value,
          });
          if (code == 3003) {
            toRaw(localTotalData)[fId.value].children.forEach((item) => {
              if (item.articleId === id) {
                item.articleName = value + ".md";
                item.time = new Date().toLocaleString();
              }
            });
            curPageData.value = [...toRaw(localTotalData)[fId.value].children];
            proxy.$msg.success(message);
          }
        }
      });
    };

    // 删除文件夹
    const deleteFolder = async (id) => {
      const { code, message } = await deleteFile(id);
      if (code == 5001) {
        toRaw(localTotalData)[fId.value].children.forEach((item, index) => {
          if (item.folderId === id) {
            toRaw(localTotalData)[fId.value].children.splice(index, 1);
          }
        });
        curPageData.value = [...toRaw(localTotalData)[fId.value].children];
        proxy.$msg.success(message);
      }
    };

    // 删除文章
    const deleteAct = async (id) => {
      const { code, message } = await deleteArticle(id);
      if (code == 3002) {
        toRaw(localTotalData)[fId.value].children.forEach((item, index) => {
          if (item.articleId === id) {
            toRaw(localTotalData)[fId.value].children.splice(index, 1);
          }
        });
        curPageData.value = [...toRaw(localTotalData)[fId.value].children];
        proxy.$msg.success(message);
      }
    };

    // 另存为
    const saveTo = () => proxy.$msg.warning("敬请期待");

    // 给容器绑定一个属性来甄别是不是文件夹内部的
    // 右键菜单的功能
    const selectItem = (e) => {
      isShow.value = false;
      // 根据菜单的不同内容执行不同的功能
      if (toRaw(operate.value) === oriOperate) {
        // num是菜单列表上的子项目的标识
        switch (parseInt(e.target.getAttribute("num"))) {
          // 新建文章
          case 0:
            depth.value
              ? addArticle(fId.value)
              : proxy.$msg.warning("请先创建文件夹");
            break;
          // 新建文件夹
          case 1:
            depth.value
              ? addFolder({ id: fId.value })
              : addFolder({ id: null });
            break;
        }
      } else if (toRaw(operate.value) === fileOperate) {
        switch (parseInt(e.target.getAttribute("num"))) {
          // 重命名
          case 0:
            if (rightClickType === "folder") {
              resetFolderName(rightClickId);
            } else if (rightClickType === "article") {
              resetArticleName(rightClickId);
            }
            break;
          // 删除
          case 1:
            if (rightClickType === "folder") {
              deleteFolder(rightClickId);
            } else if (rightClickType === "article") {
              deleteAct(rightClickId);
            }
            break;
          // 另存为
          case 2:
            saveTo();
            break;
        }
      }
    };

    return {
      curPageData,
      operate,
      container,
      point,
      isShow,
      depth,
      progress,
      changeOperate,
      selected,
      nonSelect,
      getNextFile,
      addArticle,
      addFolder,
      resetFolderName,
      resetArticleName,
      saveTo,
      deleteFolder,
      deleteAct,
      selectItem,
      rightClick,
    };
  },
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible !important;

  .progressBox {
    overflow: auto;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 25px;
      padding-right: 10px;
      margin-left: 25px;
    }

    .progress {
      display: inline-block;
      overflow: hidden;
      width: calc(100% - 60px);
      height: 100%;
    }
  }

  .first {
    span {
      &:nth-child(1) {
        margin-left: 25px !important;
      }

      &:nth-child(3) {
        width: calc(20% - 25px);
      }
    }
  }

  li {
    width: inherit;
    padding: 10px;

    span,
    p {
      display: inline-block;
      width: 25%;
      text-align: center;
      font-size: 15px;
      letter-spacing: 1px;
      white-space: nowrap;

      &:nth-child(1) {
        width: 55%;
        text-align: left;
        margin-left: 20px;
        cursor: default;
        user-select: none;
        display: inline-flex;
        align-items: center;
      }

      &:nth-child(3) {
        width: calc(20% - 20px);
      }

      img {
        width: 25px;
      }
    }

    p {
      span {
        text-align: left !important;
        margin-left: 5px;
        width: calc(100% - 30px);
        overflow: auto;
      }
    }
  }
}

.menuList {
  width: 120px;
  position: absolute;
  padding: 0 !important;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.selected {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
