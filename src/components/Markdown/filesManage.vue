<template>
  <div class="fileArea">
    <!-- item.state决定箭头方向-->
    <!-- <li class="iconfont icon-jiantouyou" -->
    <li v-for="item in newFiles" :key="item.id" @click.stop="item.state = !item.state;" @mouseover.stop="add($event)"
      @mouseout.stop="remove($event)" @mousedown="create($event, item)">
      {{ " "+item.name }}
      <menuList :operate="operate" class="menuList" v-show="isShow"
        :style="{ top: `${point.y}px`, left: `${point.x}px`, height: `${(operate.length) * 40}px` }">
      </menuList>
      <ul v-show="item.state" v-if="item?.children?.length">
        <filesManage :files="item.children" />
      </ul>
    </li>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watchEffect } from 'vue';
import fileStore from '@/store/fileStore';
import { getNext } from '@/api/fileService';
import { dataHandler } from '@/utils/check';
import menuList from '@/components/menu.vue';
export default {
  name: "filesManage",
  props: {
    files: Array,
    depth: Number
  },
  components: {
    menuList
  },
  setup(props) {
    const fStore = fileStore();
    let { localTotalData } = fStore;
    let newFiles = ref(props.files);
    let isShow = ref(false);
    let point = reactive({
      x: 0,
      y: 0,
    })
    watchEffect(() => newFiles);
    let folderOperate = [
      // 要更新本地文件树
      '新建文件夹',
      '新建文章'
    ];
    let articleOperate = [
      // 要更新本地文件树
      '重命名',
      '删除',
      '另存为',
    ];
    let operate = ref([]);
    const add = e => e.currentTarget.classList.add('hover');
    const remove = e => e.currentTarget.classList.remove('hover');
    const create = (e, item) => {
      point.x = e.clientX;
      point.y = e.clientY;
      isShow.value = true;
      operate.value = item.children ? folderOperate : articleOperate;
    }
    onMounted(() => {
      document.oncontextmenu = e => e.preventDefault();
      document.onclick = () => isShow.value ? isShow.value = false : null;
    })
    return {
      newFiles,
      operate,
      isShow,
      point,
      add,
      remove,
      create,
    }
  },
};
</script>

<style scoped lang="less">
.fileArea {
  margin-left: 15px;

  li {
    position: relative;
    width: 100%;
    font-size: 20px;
    min-height: 50px;
    line-height: 50px;
    cursor: pointer;
    margin: 5px 5px;
    list-style: none;
  }
}

.hover {
  color: #3284cf;
}

.menuList {
  width: 120px;
  position: absolute;
  padding: 0 !important;
  border-radius: 8px;
  overflow: hidden;
  transition: all .3s;
}
</style>