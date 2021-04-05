import { combineReducers } from 'redux'
import tasks from './Tasks'
import users from './Users'

export default combineReducers({ tasks, users });