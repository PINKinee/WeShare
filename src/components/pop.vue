<template>
    <div class="mask" v-show="dispo.isShow ? dispo.isShow : false">
        <!-- 两个下划线 -->
        <ul class="animate__animated animate__fadeInDownBig">
            <li>
                <span>{{ dispo.title }}</span>
                <span @click="close">×</span>
            </li>
            <li ref="li">
                <span v-show="!(dispo.input && dispo.exhibit)">
                    {{ dispo.content ? dispo.content : '' }}
                </span>
                <input type="text" v-show="dispo.input" :placeholder=dispo.placeHolder v-model.trim="inputContent" />
                <div v-show="dispo.exhibit" class="outer">
                    <div v-for="(item, index) in dispo.exhibit" :key="index">
                        <span>
                            {{ item.name }}
                        </span>
                        <span>
                            <template v-for="content in dispo.exhibitCommand">
                                <btn :content="content" @click="sendMsg(item)" class="btn"
                                    :data-clipboard-text="item.name">
                                </btn>
                            </template>
                        </span>
                    </div>
                </div>
            </li>
            <li v-show="!dispo.exhibit">
                <div>
                    <button @click="confirm">确定</button>
                    <button @click="cancel">取消</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, getCurrentInstance, reactive, onMounted, watchEffect, nextTick } from 'vue';
import Clipboard from 'clipboard';
import btn from '@/components/button.vue';
import 'animate.css';
export default {
    name: "pop",
    components: {
        btn
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const li = ref();
        let dispo = ref({});
        const inputContent = ref('');
        let tempFlag = false;
        const close = () => {
            if (!tempFlag) {
                if (dispo.value.type === 'auth') {
                    proxy.$msg.warning(dispo.value.content);
                    proxy.$bus.emit('spanContent', {
                        value: {
                            sure: false,
                            content: dispo.value.content
                        },
                        type: dispo.value.type
                    })
                }
            }
            dispo.value.isShow = false
        };
        const confirm = () => {
            tempFlag = true;
            if (dispo.value.input) {
                inputContent.value !== ''
                    ? proxy.$bus.emit('inputContent', {
                        value: inputContent.value,
                        type: dispo.value.type
                    })
                    : proxy.$msg.error('输入不能为空');
                inputContent.value = '';
            } else {
                proxy.$bus.emit('spanContent', {
                    value: {
                        sure: true,
                    },
                    type: dispo.value.type,
                })
            }
            close();
        }
        const cancel = () => close();
        const sendMsg = item => {
            if (dispo.value.type === 'delete') {
                proxy.$bus.emit('exhibit', {
                    userId: item.userId
                })
            }
            if (dispo.value.type === 'myCreate') {
                proxy.$bus.emit('exhibit', {
                    articleId: item.articleId
                })
            }
            if (dispo.value.type === 'link') {
                const clipboard = new Clipboard(".btn");
                // clipboard.destroy()释放内存
                clipboard.on("success", e => {
                    proxy.$msg.success(`${dispo.value.exhibitCommand}成功`);
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    proxy.$msg.warning('此浏览器不支持复制');
                    clipboard.destroy();
                });
                close();
            }
            onMounted(() => {
                proxy.$bus.on('setDisposition', d => dispo.value = { ...d });
            })
            return {
                dispo,
                inputContent,
                close,
                confirm,
                cancel,
                sendMsg
            }
        }
        onMounted(() => {
            proxy.$bus.on('setDisposition', d => {
                dispo.value = { ...d };
                nextTick(() => {
                    d.exhibit ? li.value.classList.add('exhibitList') : null;
                })
            });
            // 这里要让视图刷新,删除能立刻显示
        })
        return {
            dispo,
            inputContent,
            li,
            close,
            confirm,
            cancel,
            sendMsg
        }
    }
}
</script>

<style scoped lang="less">
.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;

    ul {
        width: 600px;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
        box-shadow: white 0px 0px 15px;

        li {
            width: 100%;
            height: 80px;
            border-bottom: 1px solid #e4e6eb;
            list-style: none;
            box-sizing: border-box;

            &:nth-child(1) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 50px;

                span {
                    display: inline-block;

                    &:nth-child(1) {
                        font-size: 18px;
                        letter-spacing: 2px;
                        margin: 0px 10px;
                    }

                    &:nth-child(2) {
                        float: right;
                        transform: scale(1.8);
                        cursor: pointer;
                        margin: 0px 20px;

                        &:hover {
                            color: #3284cf;
                        }
                    }
                }
            }

            &:nth-child(2) {
                display: flex;
                align-items: center;
                justify-content: center;

                input {
                    width: 90%;
                    height: 100%;
                    border: none;
                    padding-left: 10px;
                    font-size: 18px;
                    letter-spacing: 2px;
                }

                span {
                    font-size: 22px;
                    letter-spacing: 2px;
                }
            }

            &:nth-child(3) {
                height: 65px;

                div {
                    float: right;
                }

                button {
                    padding: 6px 12px;
                    font-size: 13px;
                    letter-spacing: 2px;
                    margin: 15px;
                    border-radius: 5px;
                    border: 1px solid gray;
                    cursor: pointer;

                    &:hover {
                        border: 1px solid #3284cf;
                        color: #3284cf;
                    }
                }
            }
        }

        .exhibitList {
            max-height: 200px;
            overflow-y: auto;

            .outer {
                width: 100%;

                div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    span {
                        display: inline-flex;
                        height: 100%;
                        align-items: center;

                        &:nth-child(1) {
                            width: calc(75% - 20px);
                            font-size: 14px;
                            white-space: nowrap;
                            overflow: hidden;
                            padding-left: 20px;
                        }

                        &:nth-child(2) {
                            width: 25%;
                            justify-content: center;

                            .btn {
                                transform: scale(.7);
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>