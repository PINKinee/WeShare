<template>
    <div class="top">
        <input type="file" id="avatorFile" @change="updateAvator($event)">
        <label class="avator" for="avatorFile">
            <img :src="user.portraitPath" alt="" title="点击修改头像">
        </label>
        <div class="userName">
            <span>{{ user.userName }}</span>
            <btn class="scale" :content="'修改用户名'" @click="updateUserName"></btn>
        </div>
    </div>
    <div class="btom">
        <img src="@/assets/images/self.png" alt="">
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { uploadAvator, modifyUserName } from '@/api/userService';
import btn from '@/components/Home/button.vue';
import userStore from '@/store/userStore';
export default {
    name: 'userInfo',
    components: {
        btn
    },
    setup() {
        const { proxy } = getCurrentInstance();
        const uStore = userStore();
        const { user } = uStore;
        const updateAvator = async e => {
            const param = new FormData();
            param.append('portraitPath', e.target.files[0]);
            const { data } = await uploadAvator(param);
            uStore.setUser(Object.assign(uStore.getUser, {
                portraitPath: 'http://' + JSON.parse(data).url
            }))
        }
        const updateUserName = e => {
            proxy.$bus.emit('setDisposition', {
                isShow: true,
                title: '修改用户名',
                input: true,
                placeHolder: '请输入用户名',
                type: "name"
            })
            proxy.$bus.on('inputContent', async ({ value, type }) => {
                // type === 'name' ? uStore.setUser(Object.assign(uStore.getUser, {
                //     userName: value
                // })) : null;
                if (type === 'name') {
                    const res = await modifyUserName(value);
                    console.log(res);
                    uStore.setUser(Object.assign(uStore.getUser, {
                        username: value
                    }))
                }
            })
        }
        return {
            user,
            updateAvator,
            updateUserName
        }
    }
}
</script>

<style scoped lang="less">
.top {
    width: 100%;
    height: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    input {
        display: none;
    }

    .avator {
        img {
            width: 110px;
            height: 110px;
            border-radius: 55px;
            cursor: pointer;
        }
    }

    .userName {
        display: inline-flex;
        width: 100px;
        overflow: hidden;
        margin-top: 10px;
        align-items: center;
        justify-items: center;
        flex-direction: column;

        span {
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            font-size: 20px;
            letter-spacing: 1px;
            cursor: default;
            user-select: none;
        }

        .scale {
            display: inline-block;
            transform: scale(.6);
        }
    }
}

.btom {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 185px;
    }
}
</style>