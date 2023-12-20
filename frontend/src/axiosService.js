import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    // You can add more default settings here
});

export default axiosInstance;