import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000', // your backend URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // ✅ read it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ send it
    }
    return config;
});

export default api