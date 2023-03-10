<template>
    <div class="userBox" v-show="user.userId">
        <span class="avator">
            <img :src="user.portraitPath" alt="">
        </span>
        <span class="userName">
            {{ user.userName }}
        </span>
    </div>
</template>

<script>
import userStore from '@/store/userStore';
export default {
    name: 'user',
    setup() {
        const uStore = userStore();
        const { user } = uStore;
        return {
            user
        }
    }
};

</script>

<style scoped lang="less">
.userBox {
    overflow: hidden;
    width: 100%;
    height: 100%;

    span {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
    }

    .avator {
        padding: 15px;

        img {
            width: 70px;
            height: 70px;
            border-radius: 35px;
        }
    }

    .userName {
        width: 80px;
        height: 25px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>