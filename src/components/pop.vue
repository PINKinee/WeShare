<template>
    <div class="mask" v-show="dispo.isShow ? dispo.isShow : false">
        <!-- 两个下划线 -->
        <ul class="animate__animated animate__fadeInDownBig">
            <li>
                <span>{{ dispo.title }}</span>
                <span @click="close">×</span>
            </li>
            <li>
                <span v-show="!dispo.input">
                    {{ dispo.content ? dispo.content : '' }}
                </span>
                <input type="text" v-show="dispo.input" :placeholder=dispo.placeHolder v-model.trim="inputContent" />
            </li>
            <li>
                <div>
                    <button @click="confirm">确定</button>
                    <button @click="cancel">取消</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, getCurrentInstance, reactive, onMounted } from 'vue';
import 'animate.css';
export default {
    name: "pop",
    setup() {
        const { proxy } = getCurrentInstance();
        // reactive重新赋值后失去响应式
        let dispo = ref({});
        const inputContent = ref('');
        const close = () => dispo.value.isShow = false;
        const confirm = () => {
            inputContent.value !== ''
                ? proxy.$bus.emit('inputContent', {
                    value: inputContent.value,
                    type: dispo.value.type
                })
                : proxy.$msg.error('输入不能为空');
            inputContent.value = '';
            close();
        }
        const cancel = () => close();
        onMounted(() => {
            proxy.$bus.on('setDisposition', d => dispo.value = { ...d });
        })
        return {
            dispo,
            inputContent,
            close,
            confirm,
            cancel
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

    ul {
        width: 450px;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
        box-shadow: white 0px 0px 15px;

        li {
            width: 100%;
            height: 65px;
            border-bottom: 1px solid #e4e6eb;
            list-style: none;
            box-sizing: border-box;

            &:nth-child(1) {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    display: inline-block;
                }

                span:nth-child(1) {
                    font-size: 22px;
                    letter-spacing: 2px;
                    margin: 0px 10px;
                }

                span:nth-child(2) {
                    float: right;
                    transform: scale(1.8);
                    cursor: pointer;
                    margin: 0px 20px;

                    &:hover {
                        color: #3284cf;
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
            }

            &:nth-child(3) {
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
    }
}
</style>