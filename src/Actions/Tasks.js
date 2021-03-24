import * as api from '../API'

//Action Creators
export const getTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();
        dispatch({type: "FETCH_ALL", payload: data});
    }
    catch(error) {
        console.log(error.message)
    }
    
}
export const createTask = (task) => async (dispatch) => {
    try {
        const { data } = await api.createTask(task);

        dispatch({ type: "CREATE", payload: data })
    }
    catch (error) {
        console.log(error.message)
    }
}