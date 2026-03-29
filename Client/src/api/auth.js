import api from "./axios";

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}

export const signup = async (username, email, password) => {
    const response = await api.post('/signup', { username, email, password });
    return response.data;
}

export const logout = async () => {
    const token = localStorage.getItem('token');
    const response = await api.post('/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}