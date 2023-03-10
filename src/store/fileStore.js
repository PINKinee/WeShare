import { defineStore } from "pinia";
export default defineStore("fileStore", {
  persist: {
    enabled: true,
  },
  state: () => {
    return {
      // 记录所有文件夹和文章
      localTotalData: new Map(),
      // 最近访问历史
      recentVisitList: [],
      // 历史数组的长度
      visitLen: 50,
      // 记录当前页面数据(文件夹和文章)
      curPageData: [],
      // 记录当前页面层级
      depth: 0,
      // 记录当前点击的文件夹id
      fId: -1,
      // 记录点击文件夹的父亲id
      father: -1,
      // 记录进度条数据
      progress: [],
    };
  },
  actions: {
    updateRecentVisitList(visitId) {
      // 容量和实际元素数量很可能不对等
      const arr = this.recentVisitList.filter((item) => item !== null);
      for (let i = 0; i < this.recentVisitList.length; i++) {
        // 能找到，将该id移动到最前，结束循环，没有要删除的元素，return null
        if (this.recentVisitList[i] === visitId) {
          this.recentVisitList.splice(i, 1);
          this.recentVisitList.unshift(visitId);
          break;
        } else {
          // 没有找到
          // 未满,直接unshift()
          // 已满,删掉最后面一个再unshift()
          if (arr.length < this.visitLen) {
            if (i === arr.length - 1) {
              this.recentVisitList.unshift(visitId);
              break;
            }
          } else if (arr.length === this.visitLen) {
            if (i === this.visitLen - 1) {
              let notHot = this.recentVisitList.pop();
              this.recentVisitList.unshift(visitId);
              return notHot;
            }
          }
        }
      }
      return null;
    },
  },
});
