<template>
    <div class="wholePage">
        <div class="centerDiv">
            <div class="header">
                <div class="logoBox">
                    <img src="@/assets/images/share.png" alt="">
                    <span>WeShare</span>
                </div>
                <div class="textBox">
                    <span>个人身份验证</span>
                </div>
            </div>
            <div class="footer">
                <ul>
                    <li @click="changeIndex($event)">
                        <span v-for="(item, index) in requires" :class="tabIndex === index ? 'selectd' : ''">
                            {{ item }}
                        </span>
                    </li>
                </ul>
                <div class="bottomBox">
                    <div class="loginBox" v-show="!tabIndex">
                        <div>
                            邮箱<input type="text" v-model="logInfo.userEmail"><br />
                            密码<input type="password" v-model="logInfo.userPassword"><br />
                            <div class="scale">
                                <btn :content="requires[0]" @click="checkLog($event)"></btn>
                            </div>
                        </div>
                    </div>
                    <div class="registerBox" v-show="tabIndex">
                        <div>
                            请输入邮箱<input type="text" v-model="regInfo.userEmail"><br />
                            请创建账号<input type="text" v-model="regInfo.userName"><br />
                            请设置密码<input type="password" v-model="regInfo.userPassword"><br />
                            请确认密码<input type="password" v-model="regInfo.rePsw"><br />
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
import { ref, getCurrentInstance, onMounted } from 'vue';
import { register, login, getUserMsg } from '@/api/userService'
import { checkEmail, judgePsw, checkNull } from '@/utils/check'
import btn from '../components/Home/button.vue';
import { useRouter } from 'vue-router'
import userStore from '@/store/userStore';
// import jwt_decode from 'jwt-decode';
export default {
    name: 'login',
    components: {
        btn
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const uStore = userStore();
        // 切换栏
        let tabIndex = ref(0);
        const requires = ['我要登录', '我要注册'];
        const changeIndex = e => tabIndex.value = e.target.innerText === requires[0] ? 0 : 1;
        // 注册
        const regInfo = {
            userEmail: '',
            userPassword: '',
            userName: '',
            rePsw: ''
        }
        const checkReg = () => {
            const { userEmail, userPassword, rePsw } = regInfo;
            checkEmail(userEmail)
                ? judgePsw(userPassword, rePsw)
                    ? register(regInfo).then(({ message }) => proxy.$msg.success(message))
                        .catch(({ message }) => proxy.$msg.error(message))
                    : proxy.$msg.error('两次密码不一致')
                : proxy.$msg.error('邮箱格式有误');
        }
        // 登录
        const logInfo = {
            userEmail: '',
            userPassword: ''
        }
        const checkLog = (e) => {
            if (!localStorage.getItem('token')) {
                login(logInfo).then(async ({ data, message }) => {
                    const token = JSON.parse(data).token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('flag', '您已登录');
                    const res = await getUserMsg();
                    uStore.setUser(res.data);
                    // 登录之后将标志存到localstorage中,重新挂载时获取localstorage数据并修改文本
                    e.target.innerHTML = localStorage.getItem('flag');
                    proxy.$msg.success(message);
                    router.push('/personal');
                }).catch(({ message }) => proxy.$msg.error(message));
            } else {
                proxy.$msg.error('您已登录');
            }
        }
        onMounted(() => {
            console.log(uStore.getUser);
        })
        return {
            tabIndex,
            requires,
            regInfo,
            logInfo,
            changeIndex,
            checkReg,
            checkLog
        }
    }
};
</script>

<style scoped lang="less">
.wholePage {
    width: 100vw;
    height: 100vh;
    min-width: 1200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: url('@/assets/images/bizhi.png') no-repeat left bottom,
        url('@/assets/images/bizhi2.png') no-repeat right bottom;

    .centerDiv {
        width: 30%;
        height: 65%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
        border-radius: 15px;
        overflow: hidden;

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

                span {
                    padding: 7px 15px 0px 0px;
                    letter-spacing: 1px;
                    font-weight: 700;
                }
            }
        }

        .footer {
            width: 100%;

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
                    }

                    span:nth-child(1) {
                        border-radius: 7px 0px 0px 7px;
                    }

                    span:nth-child(2) {
                        border-radius: 0px 7px 7px 0px;
                    }
                }
            }

            .bottomBox {
                width: 100%;
                height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;

                div {
                    width: 80%;
                    height: 80%;


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
                            transform: scale(.8);
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