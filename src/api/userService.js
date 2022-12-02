import axiosInstance from "@/utils/request";
export const register = (params) => axiosInstance({
    url: '/user/register',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const login = (params) => axiosInstance({
    url: '/user/login',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const getUserMsg = () => axiosInstance({
    url: `/user/getUserInformation`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

export const modifyUserName = (username) => axiosInstance({
    url: `/user/modify?username=${username}`,
    method: 'put',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
})

export const uploadAvator = (params) => axiosInstance({
    url: `/user/picture`,
    method: 'post',
    data: params,
    headers: {
        "Content-Type": 'multipart/form-data'
    }
})