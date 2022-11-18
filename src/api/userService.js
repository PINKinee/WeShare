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