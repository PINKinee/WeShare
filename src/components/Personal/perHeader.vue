<template>
  <div class="header">
    <ul>
      <li>
        <img src="@/assets/images/share.png" alt="" title="WeShare" />
      </li>
      <li>
        <span>WeShare</span>
      </li>
    </ul>
    <div class="centerInput">
      <input
        type="text"
        @change="search($event)"
        placeholder="搜索相关文件夹"
        class="input"
      />
      <img src="@/assets/images/search.png" alt="" />
    </div>
    <div>
      <span @click="turnBack">
        <img src="@/assets/images/back.png" alt="" title="返回上一级" />
      </span>
      <span @click="chooseSortWay">
        <img src="@/assets/images/paixu.png" alt="" title="选择排序方式" />
      </span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { searchFile, getBefore, getNext } from "@/api/fileService";
import userStore from "@/store/userStore";
import { storeToRefs } from "pinia";
import { dataHandler } from "@/utils/check";
import fileStore from "@/store/fileStore";
import { toRaw } from "@vue/reactivity";
export default {
  name: "perHeader",
  setup() {
    const { proxy } = getCurrentInstance();
    const uStore = userStore();
    const fStore = fileStore();
    let { localTotalData } = fStore;
    let { progress, curPageData, father, depth, fId } = storeToRefs(fStore);
    // 声明临时参数
    let tempData;
    let gress;
    // 锁
    let flag = true;
    // 声明标识参数
    let searchState = false;
    //找不到的标识
    let notFound = false;
    // onchange事件如果value不改动时只能触发一次

    // 搜第一次没问题，第二次开始点回退就有问题了
    const search = async (e) => {
      // 此刻状态为搜索状态
      searchState = true;
      // 先将目前的数据存储起来
      tempData = curPageData.value;
      gress = progress.value;
      // 搜索
      const { message, data } = await searchFile(e.target.value);
      // 搜索成功更新当前页面数据
      let { /*articleList: aL,*/ folderList: fL } = data;
      // 留下本用户的
      // 坏的是：后端返回的文章里面并没有用户id
      // aL = aL.filter((item) => item.userId == uStore.user.userId);
      fL = fL.filter((item) => item.userId == uStore.user.userId);
      if (fL.length === 0) {
        proxy.$msg.warning("没有相关内容哦");
        notFound = true;
      } else {
        // curPageData.value = dataHandler(aL, fL);
        curPageData.value = fL;
        progress.value = [];
        proxy.$msg.success(message);
      }
      e.target.value = "";
    };
    // 点击body时将数据还原
    // document.querySelector('body').onclick = e => {
    //     if (!(e.target.classList.contains('input')) && fList !== undefined) {
    //         progress.value = toRaw(gress);
    //         uStore.setFolderList(toRaw(fList));
    //         uStore.setArticleList(toRaw(aList));
    //     }
    // }

    const turnBack = async () => {
      if (searchState && !notFound) {
        curPageData.value = tempData;
        progress.value = gress;
        searchState = false;
        notFound = false;
        return;
      }
      if (depth.value === 0) {
        if (flag) {
          proxy.$msg.warning("已到文件夹根目录");
          flag = false;
          curPageData.value = [
            ...toRaw(localTotalData)[uStore.user.userId].children,
          ];
        }
      } else {
        depth.value--;
        flag = true;
        let temp = null;
        // 如果是直接通过进度条跳转的,中间部分缓存的文件夹有可能因超出容量而被移出map集合
        if (!toRaw(localTotalData)[father.value]) {
          let {
            data: { folderList: fL, articleList: aL },
          } = await getNext(father.value);
          // 撤销的需要通过这种方法更新father
          let {
            data: { folderList: f, articleList: a },
          } = await getBefore(father.value);
          temp = dataHandler(a, f)[0].fatherFolderId;
          toRaw(localTotalData)[father.value] = {
            father: temp,
            children: dataHandler(fL, aL),
          };
        } else {
          temp = toRaw(localTotalData)[father.value].father;
        }
        curPageData.value = [...toRaw(localTotalData)[father.value].children];
        progress.value.pop();
        fId.value = father.value;
        father.value = temp;
      }
    };

    const chooseSortWay = () => {
      proxy.$msg.warning("敬请期待");
      // 对files进行排序
      // 1.按首字母进行升序
      // 2.按首字母进行降序
      // 3.按修改时间升序
      // 4.按修改时间逆序
      // 5.只看文件夹
      // 6.只看文章
      // 7.隐藏文章后缀名
    };
    return {
      search,
      turnBack,
      chooseSortWay,
    };
  },
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 15%;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    li {
      float: left;

      img {
        width: 60px;
        margin: 10px 0px 0px 20px;
        cursor: pointer;
      }

      span {
        display: inline-block;
        font-size: 24px;
        margin: 28px 0px 0px 12px;
        font-style: italic;
        letter-spacing: 1px;
      }
    }
  }

  input {
    width: 350px;
    height: 30px;
    border-radius: 10px;
    padding-left: 10px;
  }

  div {
    overflow: hidden;
    vertical-align: middle;

    span {
      display: inline-bflag;

      img {
        width: 40px;
        cursor: pointer;
        margin: 15px 30px 0px 0px;
      }
    }
  }
}

.centerInput {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: relative;
    left: -10%;
    cursor: pointer;
    transform: scale(0.7);
  }
}
</style>
