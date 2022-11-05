<template>
    <div>
        <span class="iconfont icon-wenjian">{{ " " + file.name }}</span>
        <span>最近修改的时间</span>
        <span>{{ file.children ? '文件夹' : '文件' }}</span>
    </div>
    <!-- 父亲事件委托,点击了拿到id和层次,拿到之后可以找到他的孩子和爸爸 -->
    <!-- 展示其所有的children -->

</template>

<!--  -->
<script>
import { ref } from 'vue';
export default {
    name: 'file',
    // click->data=>data.children
    // 回退按钮->data.father
    props: {
        file: Object
    },
    setup(props) {
        let file = ref(props.file);
        return {
            file
        }
    }
}
</script>

<style scoped lang="less">
div {
    width: 100%;

    span {
        display: inline-block;
        width: 30%;
        font-size: 16px;
        letter-spacing: 1px;
        text-align: center;
    }

    span:nth-child(1) {
        width: 40%;
    }
}
</style>