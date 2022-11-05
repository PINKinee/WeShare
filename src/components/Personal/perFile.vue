<template>
    <ul>
        <li>
            <div>
                <span>文件名</span>
                <span>最近修改时间</span>
                <span>文件类型</span>
            </div>
        </li>
        <li v-for="item in files" :key="item.id">
            <fileVue :file="item"></fileVue>
        </li>
    </ul>

</template>

<script>
import { reactive } from 'vue';
import fileVue from '@/components/Personal/file.vue';
export default {
    name: 'perFile',
    components: {
        fileVue
    },
    setup() {
        // 请求之后存储到pinia中
        const files = reactive([
            {
                id: 1,
                name: 'f1',
                children: [
                    {
                        id: 11,
                        name: 'f11',
                        children: [
                            {
                                id: 111,
                                name: 'f111',
                            }, {
                                id: 112,
                                name: 'f112'
                            }
                        ]
                    },
                    {
                        id: 12,
                        name: 'f12'
                    }
                ]
            },
            {
                id: 2,
                name: 'f2',
                children: [
                    {
                        id: 21,
                        name: 'f21',
                        children: [
                            {
                                id: 211,
                                name: 'f211',
                            },
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: 'f3',
                children: [
                    {
                        id: 31,
                        name: 'f31'
                    },
                    {
                        id: 32,
                        name: 'f32'
                    }
                ]
            }, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ]);
        return {
            files
        }

    }
}
</script>
<style lang="less" scoped>
ul {
    width: 100%;
    height: 100%;
    display: grid;
    padding: 20px 0px;

    li {
        width: inherit;

        div {
            width: inherit;

            span {
                display: inline-block;
                width: 30%;
                font-size: 16px;
                letter-spacing: 1px;
                text-align: center;

                &:nth-child(1) {
                    width: 40%;
                }
            }
        }
    }
}
</style>