import axiosInstance from "@/api/request";
// 创建一篇文章
export const newArticle = params => axiosInstance({
    url: '/article',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})
// 获取文件路径
export const getFileUrl = params => axiosInstance({
    url: '/article/file',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});
// 修改文章内容
export const updateContent = params => axiosInstance({
    url: '/article/modifyContent',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})
// 添加协作者
export const addWriter = params => axiosInstance({
    url: '/article/addWriter',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})
// 获取文章所有协作者列表
export const getAllWriter = articleId => axiosInstance({
    url: `/article/requireAllWriter?articleId=${articleId}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})
// 删除文章
export const deleteArticle = articleId => axiosInstance({
    url: `/article?articleId=${articleId}`,
    method: 'delete',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 修改文章名称
export const updateArticleName = params => axiosInstance({
    url: `/article/modifyName`,
    data: params,
    method: 'put',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 获取用户参与的所有文章
export const getAllJoinArticle = () => axiosInstance({
    url: `/article/requireAllJoinArticle`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 删除协作者
export const deleteJoiner = params => axiosInstance({
    url: `/article/deleteWriter`,
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 获取文章的详细信息
export const getArticleMsg = articleId => axiosInstance({
    url: `/article/requireOneArticle?articleId=${articleId}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})