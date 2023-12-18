// axiosService.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    // You can add more default settings here
});

export default axiosInstance;

