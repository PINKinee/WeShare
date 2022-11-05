<template>
    <div class="top">
        <div class="avator">
            <img src="@/assets/images/touxiang.jpg" alt="">
        </div>
        <span>PINKinee</span>
    </div>
    <div class="btom">
        <img src="@/assets/images/self.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'userMsg',
    setup() {

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

    .avator {
        img {
            width: 110px;
            height: 110px;
            border-radius: 55px;
            cursor: pointer;
        }
    }

    span {
        display: inline-block;
        width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 20px;
        letter-spacing: 1px;
        margin-top: 15px;
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