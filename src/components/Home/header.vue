<template>
    <div class="header">
        <div class="left">
            <logo></logo>
        </div>
        <div class="right">
            <user></user>
        </div>
    </div>
</template>

<script>
import logo from './logo.vue'
import user from './user.vue'
export default {
    name: 'loginHeader',
    components: { logo, user },
    setup() {
    }
};

</script>

<style scoped lang="less">
.header {
    width: 100%;
    height: 100px;

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
    }
}
</style>