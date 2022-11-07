<template>
  <div class="header">
    <span
      class="iconfont icon-jiantouyou"
      title="打开文件夹"
      @click="changeState($event)"
    ></span>
    <input type="text" placeholder="输入文件标题…" />
    <span class="touxiang">
      <ul class="userMeg">
        <li>个人中心</li>
        <li>退出登录</li>
      </ul>
    </span>
    <button class="iconfont icon-fenxiang">分享</button>
    <button class="iconfont icon-baocun">保存</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "editorHeader",
  setup() {
    const state = ref(false);
    const changeState = (e) => {
      state.value = !state.value;
      const mainEdiPlace = document.querySelector(".mainEdiPlace");
      const filesManage = document.querySelector(".filesManage");
      console.log(e.target.class);
      if (state.value) {
        mainEdiPlace.style.left = "16%";
        filesManage.style.left = "0%";
        mainEdiPlace.style.width = "84%";
        e.target.className = "iconfont icon-zuojiantou";
      } else {
        mainEdiPlace.style.left = "0%";
        filesManage.style.left = "-16%";
        mainEdiPlace.style.width = "100%";
        e.target.className = "iconfont icon-jiantouyou";
      }
    };
    return { state, changeState };
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.header {
  width: 100%;
  min-width: 1000px;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  span {
    float: left;
    width: 80px;
    height: 100%;
    line-height: 270%;
    margin-right: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 30px;
    color: #86909c;
  }
  input {
    float: left;
    width: 50%;
    height: 100%;
    font-size: 25px;
    border: none;
    margin-right: 30px;
    color: #86909c;
    background-color: transparent;
  }
  button {
    float: right;
    width: 100px;
    height: 50px;
    border: 2px solid #1d7dfa;
    border-radius: 10px;
    margin-right: 30px;
    background: none;
    font-size: 20px;
    color: #1d7dfa;
    margin-top: 16px;
  }
  .touxiang {
    position: relative;
    float: right;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 1px solid #eee;
    margin-top: 10px;
    margin-right: 70px;
    background: url("~@/assets/images/touxiang.jpg") no-repeat;
    background-size: 60px;
    ul {
      position: absolute;
      width: 160px;
      top: 70px;
      left: -50px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      z-index: 100;
      display: none;
      li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        background-color: #fff;
        &:first-child {
          border-bottom: 2px solid #eee;
          border-radius: 10px 10px 0 0;
        }
        &:last-child {
          border-radius: 0 0 10px 10px;
        }
        &:hover {
          color: #1d7dfa;
        }
      }
      &::before {
        content: "";
        position: absolute;
        display: inline-block;
        top: -20px;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom-color: #fff;
      }
    }
    &:hover ul {
      display: block;
    }
  }
}
</style>