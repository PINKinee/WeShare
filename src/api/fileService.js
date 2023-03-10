import axiosInstance from "@/api/request";
// 新建文件夹
export const newFolder = params => axiosInstance({
    url: `/folder`,
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 获取下一级目录
export const getNext = folderId => axiosInstance({
    url: `/folder?folderId=${folderId}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 获取上一级目录
export const getBefore = folderId => axiosInstance({
    url: `/folder/before?folderId=${folderId}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 关键词搜索
export const searchFile = words => axiosInstance({
    url: `/folder/name?words=${words}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 删除文件夹
export const deleteFile = folderId => axiosInstance({
    url: `/folder?folderId=${folderId}`,
    method: 'delete',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 修改文件夹名称
export const updateFolderName = params => axiosInstance({
    url: `/folder`,
    data: params,
    method: 'put',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
