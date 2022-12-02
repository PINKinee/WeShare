import { defineStore } from 'pinia'
import deleteEl from '@/utils/deleteEl'
export default defineStore('userStore', {
    persist: {
        enabled: true,
    },
    state: () => {
        return {
            user: {
            },
            folderList: [],
            articleList: []
        }
    },
    getters: {
        getUser: state => state.user,
        getFolderList: state => state.folderList
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        setFolderList(folderList) {
            this.folderList = folderList;
        },
        addFolder(newFolder) {
            this.folderList.push(newFolder);
        },
        deleteFolder(folderId) {
            deleteEl(this.folderList, folderId, 'folderId')
        },
        setArticleList(articleList) {
            this.articleList = articleList;
        },
        addArticle(newArticle) {
            this.articleList.push(newArticle);
        },
        deleteArticle(articleId) {
            deleteEl(this.articleList, articleId, 'articleId');
        }
    },
})
