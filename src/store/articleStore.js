import { defineStore } from 'pinia'
export default defineStore('artStore', {
    persist: {
        enabled: true,
    },
    state: () => {
        return {
            // 重新挂载时判断本地有没有数据(用一个map集合来保存数据,因为一个用户可能打开多篇文章)
            // 一个用户可能保存多篇文章,所以
            artcileMap: new Map(),
            // 记录当前文章创建者信息(每打开一篇文章都要更新,无需持久化)
            createrMsg: {},
            // 记录当前打开文章的共享者列表(每打开一篇文章都要更新,无需持久化)
            participants: [],
            // 记录当前打开文章的详细信息(每打开一篇文章都要更新,无需持久化)
            curArticleMsg: {},
            // 这个值每篇文章都要
            // 记录是否是通过链接进来的(每进入一篇文章都要)
            // 注意:我创建列表和我参与列表会给出链接,通过该链接访问时也要设置为true
            enterByLink: false,
            // 按钮禁用标识(每打开一篇文章都要认证其身份,每次都要赋值,无需持久化)
            allowFlag: true,
            // 当前打开文章的目录数组
            fileTree: [],
        }
    },
    actions: {
        setCreaterMsg(msg) {
            this.createrMsg = msg;
        },
        setParticipants(list) {
            this.participants = list;
        },
        setCurArticleMsg(msg) {
            this.curArticleMsg = msg;
        }
    }
})