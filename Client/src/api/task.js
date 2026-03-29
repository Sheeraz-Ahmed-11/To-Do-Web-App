import api from "./axios";

export const getTodo = async (category) => await api.get(`/get/todo?category=${category}`);
export const createTodo = async (data) => await api.post('/create/todo', data);
export const deleteTodo = async (id) => await api.delete(`/delete/todo/${id}`);
export const updateTodo = async (id, data) => await api.put(`/update/todo/${id}`, data);
export const completeTodo = async (id, data) => await api.patch(`/complete/todo/${id}`, data);