import axios from 'axios'

const api = axios.create({
    baseURL: 'https://to-do-web-app-production-e504.up.railway.app',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api
