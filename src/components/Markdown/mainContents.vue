<template>
  <div class="richText">
    <filesManageVue></filesManageVue>
    <div class="mainEdiPlace">
      <div class="richText-left" ref="l" contentEditable="true"></div>
      <div class="richText-middle" ref="m"></div>
      <div class="richText-right" ref="r">
        <syntaxDes></syntaxDes>
      </div>
    </div>
  </div>
</template>

<script>
import syntaxDes from "./syntaxDes.vue";
import filesManageVue from "./filesManage.vue";
export default {
  name: "richText",
  components: { syntaxDes, filesManageVue },
  setup() {},
};
</script>

<style lang="less" scoped>
.richText {
  position: relative;
  width: 100%;
  height: calc(100vh - 160px);
  .mainEdiPlace {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0%;
    display: flex;
    transition: all 0.5s;
    .richText-left {
      height: 100%;
      width: 40%;
      font-size: 30px;
      outline: none;
      background: #eee;
      color: #555;
      padding: 20px;
      transition: all 0.5s;
    }
    .richText-middle {
      height: 100%;
      width: 40%;
      font-size: 30px;
      color: #555;
      border-right: 2px solid #eee;
      padding: 20px;
      transition: all 0.5s;
    }
    .richText-right {
      width: 20%;
      height: 100%;
      padding: 20px;
      transition: all 0.5s;
    }
  }
}
</style>