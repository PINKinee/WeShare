<template>
    <div class="centerBox">
        <mainTitle></mainTitle>
        <div class="bottom">
            <div class="imgBox" v-for="item in dataList" :key="item.id" :style="{ width: 100 / dataList.length + '%' }">
                <introduceVue :data="item"></introduceVue>
            </div>
        </div>
    </div>
</template>

<script>
import mainTitle from './mainTitle.vue';
import introduceVue from './introduce.vue';
export default {
    name: 'center',
    components: {
        mainTitle,
        introduceVue
    },
    setup() {
        const dataList = [
            {
                id: 1,
                img: require('@/assets/images/xiezuo.png'),
                title: '多人协作',
                content: '多人协作编辑同一个在线文档，无需来回发送与汇总',
            },
            {
                id: 2,
                img: require('@/assets/images/fenxiang.png'),
                title: '文档分享',
                content: '一键分享文档,根据权限对文档进行相应的操作',
            },
            {
                id: 3,
                img: require('@/assets/images/tubiao.png'),
                title: '实时显示',
                content: '用户在编辑区书写,显示区实时显示用户的操作',
            },
            {
                id: 4,
                img: require('@/assets/images/zhidao.png'),
                title: '语法指导',
                content: '语法指导板块供用户参考学习,方便零基础人员使用',
            }
        ];
        return {
            dataList
        }
    }
};

</script>

<style scoped lang="less">
.centerBox {
    width: 100%;
    height: 470px;

    .bottom {
        width: 100%;
        height: 250px;
        margin-top: 40px;
        overflow: visible;

        .imgBox {
            display: inline-block;
            height: 100%;
            overflow: visible;
        }
    }

}
</style>