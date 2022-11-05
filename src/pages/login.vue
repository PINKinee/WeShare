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
            <!-- v-show -->
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
                            账号<input type="text"><br />
                            密码<input type="password"><br />
                            <div class="scale">
                                <btn :content="requires[0]"></btn>
                            </div>
                        </div>
                    </div>
                    <div class="registerBox" v-show="tabIndex">
                        <div>
                            请输入账号<input type="text"><br />
                            请设置密码<input type="password"><br />
                            请确认密码<input type="password"><br />
                            <div class="scale">
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
import { ref } from 'vue';
import btn from '../components/Home/button.vue';
export default {
    name: 'login',
    components: {
        btn
    },
    setup() {
        let tabIndex = ref(0);
        const requires = [
            '我要登录',
            '我要注册'
        ]
        const changeIndex = e => tabIndex.value = e.target.innerText === '我要登录' ? 0 : 1;
        return {
            tabIndex,
            requires,
            changeIndex
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
                            width: 170px;
                            height: 25px;
                            margin-left: 10px;
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