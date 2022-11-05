<template>
    <div class="wholePage">
        <div class="personalBox">
            <perHeaderVue></perHeaderVue>
            <div class="main">
                <div class="left">
                    <userMsgVue></userMsgVue>
                </div>
                <div class="right">
                    <perFileVue></perFileVue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import perHeaderVue from '@/components/Personal/perHeader.vue';
import perFileVue from '@/components/Personal/perFile.vue';
import userMsgVue from '@/components/Personal/userMsg.vue';
export default {
    name: 'personal',
    components: {
        perHeaderVue,
        userMsgVue,
        perFileVue
    },
    setup() {

    }
}

</script>

<style scoped lang="less">
.wholePage {
    width: 100vw;
    height: 100vh;
    min-width: 1100px;
    min-height: 560px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #fafafa;
    background: url('@/assets/images/selfBGI.png') no-repeat left bottom;


    .personalBox {
        width: 75%;
        height: 75%;
        border-radius: 40px;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.06);
        background-color: white;

        .main {
            width: 100%;
            height: 85%;
            box-sizing: border-box;
            overflow: hidden;

            .left {
                display: inline-block;
                width: 20%;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
                border-right: 1px solid gray;
            }

            .right {
                display: inline-block;
                width: 80%;
                height: 100%;
                box-sizing: border-box;
                overflow-y: scroll;
            }
        }
    }
}
</style>