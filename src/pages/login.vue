<template>
  <div class="wholePage">
    <div class="centerDiv">
      <div class="header">
        <div class="logoBox">
          <img src="@/assets/images/share.png" alt="" />
          <span>WeShare</span>
        </div>
        <div class="textBox" @click="toCenter">
          <span>个人中心</span>
          <img src="@/assets/images/jumpTo.png" title="个人中心" />
        </div>
      </div>
      <div class="footer">
        <ul>
          <li @click="changeIndex($event)">
            <span
              v-for="(item, index) in requires"
              :class="tabIndex === index ? 'selectd' : ''"
            >
              {{ item }}
            </span>
          </li>
        </ul>
        <div class="bottomBox">
          <div class="loginBox" v-show="!tabIndex">
            <div>
              邮箱<input type="text" v-model="logInfo.userEmail" /><br />
              密码<input type="password" v-model="logInfo.userPassword" /><br />
              <div class="scale">
                <btn
                  :content="requires[0]"
                  @click="checkLog($event)"
                  ref="logBtn"
                ></btn>
              </div>
            </div>
          </div>
          <div class="registerBox" v-show="tabIndex">
            <div>
              请输入邮箱<input type="text" v-model="regInfo.userEmail" /><br />
              请创建账号<input type="text" v-model="regInfo.userName" /><br />
              请设置密码<input
                type="password"
                v-model="regInfo.userPassword"
              /><br />
              请确认密码<input type="password" v-model="regInfo.rePsw" /><br />
              <!-- 再增加keyup事件 -->
              <div class="scale" @click="checkReg">
                <btn :content="requires[1]"></btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { register, login, getUserMsg } from "@/api/userService";
import { checkEmail, judgePsw } from "@/utils/check";
import btn from "@/components/button.vue";
import { useRouter } from "vue-router";
import userStore from "@/store/userStore";
export default {
  name: "login",
  components: {
    btn,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const uStore = userStore();
    // 切换栏
    let tabIndex = ref(0);
    const requires = ref(["我要登录", "我要注册"]);
    const changeIndex = (e) => {
      tabIndex.value = e.target.innerText === requires.value[0] ? 0 : 1;
    };
    // 注册
    const regInfo = {
      userEmail: "",
      userPassword: "",
      userName: "",
      rePsw: "",
    };
    const checkReg = () => {
      const { userEmail, userPassword, rePsw } = regInfo;
      checkEmail(userEmail)
        ? judgePsw(userPassword, rePsw)
          ? register(regInfo)
              .then(({ message }) => {
                console.log(message);
                proxy.$msg.success(message);
              })
              .catch(({ message }) => proxy.$msg.error(message))
          : proxy.$msg.error("两次密码不一致")
        : proxy.$msg.error("邮箱格式有误");
    };
    // 登录
    const logInfo = {
      userEmail: "",
      userPassword: "",
    };
    const checkLog = () => {
      const token = localStorage.getItem("token");
      if (token === null || token === "") {
        login(logInfo)
          .then(async ({ data, message }) => {
            localStorage.setItem("token", JSON.parse(data).token);
            const res = await getUserMsg();
            console.log(res);
            uStore.setUser(res.data);
            proxy.$msg.success(message);
            requires.value[0] = "退出登录";
            // 判断进入方式
            if (sessionStorage.getItem("enterByLink") === "true") {
              // 一定要刷新,才能走编辑页的onMount
              router.go(-1);
              sessionStorage.setItem("enterByLink", false);
            } else {
              router.push("/personal");
            }
          })
          .catch(({ message }) => proxy.$msg.error(message));
      } else {
        localStorage.removeItem("userStore");
        localStorage.removeItem("token");
        localStorage.removeItem("fileStore");
        proxy.$msg.success("退出登录成功");
        requires.value[0] = "我要登录";
      }
    };
    // 跳转
    const toCenter = () => {
      const token = localStorage.getItem("token");
      token !== (null && "")
        ? router.push("/personal")
        : proxy.$msg.error("您未登录");
    };

    onMounted(() => {
      localStorage.getItem("token") ? (requires.value[0] = "退出登录") : null;
    });
    return {
      tabIndex,
      requires,
      regInfo,
      logInfo,
      changeIndex,
      checkReg,
      checkLog,
      toCenter,
    };
  },
};
</script>

<style scoped lang="less">
.wholePage {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 550px;
  overflow: visible !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url("@/assets/images/bizhi.png") no-repeat left bottom,
    url("@/assets/images/bizhi2.png") no-repeat right bottom;

  .centerDiv {
    width: 30%;
    height: 65%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    border-radius: 15px;
    overflow: visible !important;
    min-height: 380px;

    .header {
      width: 100%;
      height: 15%;
      border-bottom: 1px solid rgb(176, 175, 175);
      overflow: hidden;

      .logoBox {
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        img {
          width: 50px;
          margin-left: 10px;
        }

        span {
          font-size: 20px;
          padding: 7px 0px 0px 10px;
        }
      }

      .textBox {
        float: right;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
          margin-right: 10px;
          letter-spacing: 1px;
          font-weight: 700;
        }

        img {
          width: 20px;
          margin-right: 15px;
        }
      }
    }

    .footer {
      width: 100%;
      overflow: visible !important;

      ul {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        li {
          width: 80%;
          height: 45px;
          box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 2px;
          list-style: none;

          span {
            display: inline-block;
            width: 50%;
            height: 45px;
            line-height: 45px;
            box-sizing: border-box;
            text-align: center;
            border: solid 1px #e9ebed;
            letter-spacing: 1px;
            cursor: pointer;

            &:nth-child(1) {
              border-radius: 7px 0px 0px 7px;
            }

            &:nth-child(2) {
              border-radius: 0px 7px 7px 0px;
            }
          }
        }
      }

      .bottomBox {
        width: 100%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible !important;

        div {
          width: 80%;
          height: 80%;
          overflow: visible !important;

          div {
            width: 100%;
            height: 100%;
            letter-spacing: 1px;
            text-align: center;
            line-height: 45px;

            input {
              width: 175px;
              height: 27px;
              margin-left: 12px;
              padding-left: 5px;
              border-radius: 5px;
              border: 1px solid gray;
            }

            .scale {
              transform: scale(0.8);
            }
          }
        }
      }
    }
  }
}

.selectd {
  background-color: #f3f5f7;
}
</style>
