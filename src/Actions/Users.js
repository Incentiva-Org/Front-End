import * as api from '../API'
import { CREATE } from '../constants/actionTypes';

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);

        dispatch({ type: CREATE, payload: data })
    }
    catch (error) {
        console.log(error.message)
    }
}