import { defineStore } from 'pinia'
export default defineStore('mystore', {
    state: () => {
        return {
            editor: null,
            scrollPlace: '',
            noEchart: '',//未经过echarts编译的内容
        }
    },
})