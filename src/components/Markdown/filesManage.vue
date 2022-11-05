<template>
  <div class="fileManage">
    <!-- item.state决定箭头方向-->
    <li class="iconfont icon-jiantouyou" v-for="item in newFiles" :key="item.id" @click.stop="item.state = !item.state"
      @mouseover.stop="add($event)" @mouseout.stop="remove($event)">
      {{ " " + item.name }}
      <!-- <transition name="fade"> -->
      <ul v-show="item.state" v-if="item?.children?.length">
        <filesManage :files="item.children" />
      </ul>
      <!-- </transition> -->
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
.fileManage {
  margin-left: 15px;

  li {
    width: 100%;
    font-size: 20px;
    min-height: 50px;
    line-height: 50px;
    cursor: pointer;
    margin: 5px 5px;
  }
}

.hover {
  color: #3284cf;
}
</style>