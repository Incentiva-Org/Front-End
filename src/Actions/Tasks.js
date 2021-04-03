import * as api from '../API'
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../Constants/actionTypes';

//Action Creators
export const getTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();
        dispatch({type: FETCH_ALL, payload: data});
    }
    catch(error) {
        console.log(error.message)
    }
    
}
export const createTask = (task) => async (dispatch) => {
    try {
        const { data } = await api.createTask(task);

        dispatch({ type: CREATE, payload: data })
    }
    catch (error) {
        console.log(error.message)
    }
}
export const editTask = (id, task) => async (dispatch) => {
    try {
        const { data } = await api.editTask(id, task);

        dispatch({ type: UPDATE, payload: data })
    }
    catch (error) {
        console.log(error.message)
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
      await api.deleteTask(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };