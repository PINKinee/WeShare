<template>
    <div class="wholePage">
        <div class="homeArea">
            <homeHeader></homeHeader>
            <center></center>
            <div class="footer">
                <btn :content="'我要使用'" @click="jump"></btn>
            </div>
        </div>
    </div>
</template>

<script>
import homeHeader from '../components/Home/header.vue'
import center from '../components/Home/center.vue'
import btn from '../components/Home/button.vue'
import { useRouter } from 'vue-router';
export default {
    name: 'home',
    components: {
        homeHeader,
        center,
        btn
    },
    setup() {
        const router = useRouter();
        const jump = () => router.push('/personal');
        return {
            jump
        }
    }
};

</script>

<style scoped lang="less">
.wholePage {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
    min-width: 1100px;
    height: 100vh;

    .homeArea {
        width: 80%;
        height: 100%;

        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100px;
        }
    }
}
</style>