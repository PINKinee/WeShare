<template>
  <ul ref="ul">
    <li
      v-for="(item, index) in gress"
      :key="index"
      @click.self="chooseFolder($event, item, index)"
      class="gressLi"
    >
      {{ item.folderName + " >>" }}
    </li>
  </ul>
</template>

<script>
import { ref, watchEffect } from "vue";
import { toRaw } from "@vue/reactivity";
import fileStore from "@/store/fileStore";
import { getNext } from "@/api/fileService";
import { dataHandler } from "@/utils/check";
import { storeToRefs } from "pinia";
export default {
  name: "pace",
  props: {
    progress: Array,
  },
  setup(props) {
    const gress = ref(props.progress);
    const ul = ref();
    const fStore = fileStore();
    let { depth, fId, localTotalData, father } = fStore;
    let { progress, curPageData } = storeToRefs(fStore);
    const chooseFolder = async (e, item, index) => {
      // 不太正规的做法,但是方便
      document.querySelectorAll(".gressLi").forEach((ele) => {
        if (ele.classList.contains("highlight")) {
          ele.classList.remove("highlight");
        }
      });
      e.target.classList.add("highlight");
      const rawItem = toRaw(item);
      fId = rawItem.folderId;
      father = rawItem.fatherFolderId;
      depth = index;
      const notHot = updateRecentVisitList(fId);
      notHot !== null ? localTotalData.delete(notHot) : null;
      if (!localTotalData.has(fId)) {
        let {
          data: { folderList: f, articleList: a },
        } = await getNext(fId);
        localTotalData.set(fId, {
          father,
          children: dataHandler(f, a),
        });
      }
      curPageData.value = localTotalData.get(fId).children;
      progress.value.splice(index, progress.value.length - 1 - index);
    };
    watchEffect(() => (gress.value = props.progress));
    return {
      ul,
      gress,
      chooseFolder,
    };
  },
};
</script>

<style scoped lang="less">
ul {
  width: 100%;
  height: 100%;
  padding: 0px !important;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    // 上下 左右
    padding: 15px 2px;
    list-style: none;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: default;
  }
}

.highlight {
  color: #3284cf;
}
</style>
