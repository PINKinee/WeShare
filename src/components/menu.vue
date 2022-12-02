<template>
    <ul>
        <li v-for="(item, index) in operate" :key="index" :class="'flag'" :num="index">
            {{ item.name }}
        </li>
    </ul>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'menuList',
    props: {
        operate: Array
    },
    setup(props) {
        const operate = ref(props.operate);
        return {
            operate
        }
    }
}

</script>

<style scoped lang="less">
ul {
    width: 100%;
    height: 100%;
    border: 1px solid #e4e6eb;
    background-color: white;
    z-index: 100;

    li {
        overflow: hidden;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        box-sizing: border-box;
        list-style: none;

        &:hover {
            background-color: #e4e6eb;
            cursor: pointer;
        }
    }
}
</style>