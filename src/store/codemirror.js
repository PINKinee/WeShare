import { defineStore } from 'pinia'
export default defineStore('mystore', {
    state: () => {
        return {
            md: null,
            scrollPlace: ''
        }
    },
})