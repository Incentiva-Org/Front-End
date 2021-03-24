import axios from 'axios';

const url = 'https://incentiva-server.herokuapp.com/tasks';

export const fetchTasks = () => axios.get(url);
export const createTask = (newTask) => axios.post(url, newTask);