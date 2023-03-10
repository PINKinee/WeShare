import { defineStore } from 'pinia'
export default defineStore('userStore', {
    persist: {
        enabled: true,
    },
    state: () => {
        return {
            user: {
            },
            // 我创建的文章列表(每创建一篇文章就push进来)
            createArticleList: [],
            // 每一篇文章的权限
            articleAuth: new Map(),
            // 记录当前文章信息
            // curArticleMsg: [],
            // 我参与的文章列表
            // joinArticleList: [],
        }
    },
    // 计算属性
    // getters: {},
    actions: {
        setUser(user) {
            this.user = user;
        },
        setCreateArticleList(article) {
            this.createArticleList.push(article);
        },
        // setCurArticleMsg(msg) {
        //     this.curArticleMsg = msg;
        // },
        // setJoinArticleList(article) {
        //     this.joinArticleList.push(article);
        // }
    },
})
