import axios from 'axios';

const url = 'https://incentiva-server.herokuapp.com/tasks';

export const fetchTasks = () => axios.get(url);
export const createTask = (newTask) => axios.post(url, newTask);
export const editTask = (id, newTask) => axios.patch(`${url}/${id}`, newTask);
export const deleteTask = (id) => axios.delete(`${url}/${id}`);