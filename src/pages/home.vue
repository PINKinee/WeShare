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
import btn from '../components/button.vue'
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
        // const jump = () => router.push('/personal');
        const jump = () => {
            if (localStorage.getItem('userStore')) {
                router.push('/personal');
            } else {
                router.push('/login');
            }
        }
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
    min-width: 1260px;
    height: 100vh;

    .homeArea {
        width: 80%;
        height: 100%;
        overflow: visible;

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