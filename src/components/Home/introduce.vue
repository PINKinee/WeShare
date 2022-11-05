<template>
    <div>
        <img :src="data.img" :title="data.title" :alt="data.title">
    </div>
    <h2>{{ data.title }}</h2>
    <div class="detail">
        <h5>{{ data.content }}</h5>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'introduce',
    props: {
        data: Object
    },
    setup(props) {
        let data = ref(props.data);
        return {
            data
        }
    }
};

</script>

<style scoped lang="less">
div {
    width: 100%;
    height: 70%;
    text-align: center;
    vertical-align: middle;

    img {
        width: 200px;
        height: 155px;
        cursor: pointer;
    }

    h2 {
        text-align: center;
        letter-spacing: 4px;
        font-weight: 400;
        font-size: 25px;
    }

    .detail {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90px;

        h5 {
            width: 80%;
            font-weight: 400;
            letter-spacing: 3px;
            line-height: 30px;
            color: gray;
        }
    }
}
</style>