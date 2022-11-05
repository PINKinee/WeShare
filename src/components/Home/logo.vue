<template>
    <div class="logoBox">
        <span class="logo">
            <img src="@/assets/images/share.png" alt="">
        </span>
        <span>WeShare</span>
    </div>
</template>

<script>
export default {
    name: 'logo',
};

</script>

<style scoped lang="less">
.logoBox {
    overflow: hidden;
    width: 100%;
    height: 100%;

    span {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;

        img {
            width: 60px;
            padding: 20px 0px 5px 10px;
        }
    }

    span:nth-child(2) {
        font-size: 22px;
        padding: 30px 0px 10px 10px;
    }
}
</style>