<template>
  <div class="fileArea">
    <!-- item.state决定箭头方向-->
    <li class="iconfont icon-jiantouyou" v-for="item in newFiles" :key="item.id" @click.stop="item.state = !item.state"
      @mouseover.stop="add($event)" @mouseout.stop="remove($event)">
      {{ " " + item.name }}
      <ul v-show="item.state" v-if="item?.children?.length">
        <filesManage :files="item.children" />
      </ul>
    </li>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "filesManage",
  props: {
    files: Array,
    depth: Number
  },
  setup(props) {
    let newFiles = ref(props.files);
    const add = e => e.currentTarget.classList.add('hover');
    const remove = e => e.currentTarget.classList.remove('hover');
    return {
      newFiles,
      add,
      remove
    }
  },
};
</script>

<style scoped lang="less">
.fileArea {
  margin-left: 15px;

  li {
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
</style>