<template>
  <div class="header">
    <div class="left">
      <logo></logo>
    </div>
    <div
      class="right"
      @mouseover.stop="isShow = true"
      @mouseout.stop="isShow = false"
    >
      <user></user>
      <btn
        @click="logOut($event)"
        content="退出登录"
        v-show="isShow && user.userId"
      ></btn>
    </div>
  </div>
</template>

<script>
import logo from "./logo.vue";
import user from "./user.vue";
import btn from "@/components/button.vue";
import { getCurrentInstance, ref } from "vue";
import userStore from "@/store/userStore";
export default {
  name: "loginHeader",
  components: { logo, user, btn },
  setup() {
    const { proxy } = getCurrentInstance();
    const uStore = userStore();
    const { user } = uStore;
    let isShow = ref(false);
    const token = localStorage.getItem("token");
    token !== null && token !== "" ? (isShow.value = true) : null;
    const logOut = () => {
      localStorage.removeItem("userStore");
      localStorage.removeItem("token");
      localStorage.removeItem("fileStore");
      proxy.$msg.success("退出登录成功");
    };
    return {
      isShow,
      logOut,
      user,
    };
  },
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 100px;
  overflow: visible;

  div {
    display: inline-block;
    height: 100%;
  }

  .left {
    width: 200px;
  }

  .right {
    width: 200px;
    float: right;
    position: relative;
    overflow: visible;

    button {
      position: absolute;
      top: 85px;
      left: -15px;
      transform: scale(0.8);
    }
  }
}
</style>
