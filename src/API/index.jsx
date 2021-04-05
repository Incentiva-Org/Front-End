import axios from 'axios';

const url = 'https://incentiva-server/tasks';

export const fetchTasks = () => axios.get(url);
export const createTask = (newTask) => axios.post(url, newTask);
export const editTask = (id, newTask) => axios.patch(`${url}/${id}`, newTask);
export const deleteTask = (id) => axios.delete(`${url}/${id}`);

const authUrl = 'https://incentiva-server/users/';

export const createUser = (newUser) => axios.post(`${authUrl}/signup`, newUser)
