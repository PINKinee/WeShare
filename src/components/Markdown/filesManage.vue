<template>
  <ul class="filesManage">
    <li class="iconfont icon-wenjian" v-for="(f, index) of files" :key="index">
      {{ " " + f }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "filesManage",
  setup() {
    const files = ["文件名1", "文件名2", "文件名3"];
    return { files };
  },
};
</script>

<style scoped lang="less">
ul {
  position: absolute;
  left: -20%;
  top: 0;
  width: 20%;
  height: 100%;
  background-color: #fff;
  transition: all 0.5s;
  li {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      color: #3284cf;
    }
  }
}
</style>