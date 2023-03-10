import axiosInstance from "@/api/request";
// 注册
export const register = params => axiosInstance({
    url: '/user/register',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
// 登录
export const login = params => axiosInstance({
    url: '/user/login',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
// 获取用户信息
export const getUserMsg = () => axiosInstance({
    url: `/user/getUserInformation`,
    method: 'get',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 修改用户名称
export const modifyUserName = params => axiosInstance({
    url: `/user/modify/username`,
    method: 'put',
    data: params,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
// 上传(修改)头像
export const uploadAvator = params => axiosInstance({
    url: `/user/picture`,
    method: 'post',
    data: params,
    headers: {
        "Content-Type": 'multipart/form-data'
    }
})