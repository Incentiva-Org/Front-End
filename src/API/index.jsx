import axios from 'axios';

//://incentiva-server.herokuapp.com

const url = 'https://incentiva-server.herokuapp.com/tasks';

export const fetchTasks = (id) => axios.post(`${url}/usertasks`, {uid: id});
export const createTask = (newTask) => axios.post(`${url}/createTask`, newTask);
export const editTask = (taskId, newTask) => axios.post(`${url}/editTask`, {id: taskId, updatedTask: newTask});
export const deleteTask = (taskId) => axios.post(`${url}/deleteTask`, {id: taskId});

const notesUrl = 'https://incentiva-server.herokuapp.com/notes';

export const fetchNotes = (id) => axios.post(`${notesUrl}/usernotes`, {uid: id});
export const createNote = (newNote) => axios.post(`${notesUrl}/createNote`, newNote);
export const editNote = (noteId, newNote) => axios.post(`${notesUrl}/editNote`, {id: noteId, updatedNote: newNote});
export const deleteNote = (noteId) => axios.post(`${notesUrl}/deleteNote`, {id: noteId});


const usersUrl = 'https://incentiva-server.herokuapp.com/users';

export const createUserUid = (uid, username) => axios.post(`${usersUrl}/create`, {Username: username, uid: uid});


const friendsUrl = 'https://incentiva-server.herokuapp.com/friends';

export const getInfo = (uid) => axios.post(`${friendsUrl}/getInfo`, {uid: uid});
export const removePending = (userUid, usernameRemove) => axios.post(`${friendsUrl}/removePending`, {userUid: userUid, usernameRemove, usernameRemove});
export const acceptPending = (userUid, usernameAdd) => axios.post(`${friendsUrl}/acceptPending`, {userUid: userUid, usernameAdd, usernameAdd});
export const sendRequest = (userUid, usernameAdd) => axios.post(`${friendsUrl}/sendRequest`, {userUid: userUid, userRequest: usernameAdd});