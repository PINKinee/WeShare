import axios from 'axios'
import router from 'vue-router';
const axiosInstance = axios.create({
    baseURL: '/api'
});
axiosInstance.interceptors.request.use(config => {
    return config;
});
axiosInstance.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
    err => Promise.reject(err.data),
);
export default axiosInstance;