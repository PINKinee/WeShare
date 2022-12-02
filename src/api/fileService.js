import axiosInstance from "@/utils/request";
export const newFolder = (params) => axiosInstance({
    url: `/folder`,
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
})

export const getNext = (params) => axiosInstance({
    url: `/folder?folderId=${params}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

export const searchFile = (words) => axiosInstance({
    url: `/folder/name?words=${words}`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

export const deleteFile = (folderId) => axiosInstance({
    url: `/folder?folderId=${folderId}`,
    method: 'delete',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})


export const updateFolderName = (folderId) => axiosInstance({
    url: `/folder?folderId=${folderId}`,
    method: 'put',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})