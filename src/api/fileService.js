import axiosInstance from "@/utils/request";
export const getMsg = (params) => axiosInstance({
    url: '/folder/name',
    data: params,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const getBefore = (params) => axiosInstance({
    url: '/folder/before',
    data: params,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const getNext = (params) => axiosInstance({
    url: '/folder',
    data: params,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});