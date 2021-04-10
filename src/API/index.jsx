import axios from 'axios';

//://incentiva-server.herokuapp.com

const url = 'https://incentiva-server.herokuapp.com/tasks';

export const fetchTasks = (id) => axios.post(`${url}/usertasks`, {username: id});
export const createTask = (newTask) => axios.post(`${url}/createTask`, newTask);
export const editTask = (taskId, newTask) => axios.post(`${url}/editTask`, {id: taskId, updatedTask: newTask});
export const deleteTask = (taskId) => axios.post(`${url}/deleteTask`, {id: taskId});

const authUrl = 'https://incentiva-server.herokuapp.com/users';

export const createUser = (newUser) => {return axios.post(`${authUrl}/signup`, newUser)}

export const loginUser = (user) => {return axios.post(`${authUrl}/signin`, user)}