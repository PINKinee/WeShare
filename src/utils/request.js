import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: '/api'
});

axiosInstance.interceptors.request.use(config => {
    if (config.url !== ('/user/login' && '/user/register') && localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
}, err => Promise.reject(err));

axiosInstance.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
    err => Promise.reject(err.data),
);

export default axiosInstance;