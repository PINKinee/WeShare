<template>
    <div class="userBox">
        <span class="avator">
            <img src="@/assets/images/touxiang.jpg" alt="">
        </span>
        <span class="userName">PINKinee</span>
    </div>
</template>

<script>
export default {
    name: 'user',
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