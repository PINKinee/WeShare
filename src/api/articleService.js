import axiosInstance from "@/utils/request";
export const getFileUrl = (params) => axiosInstance({
    url: '/article/file',
    data: params,
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});