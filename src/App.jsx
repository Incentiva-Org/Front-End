import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getTasks } from './Actions/Tasks'

import Navbar from './Components/Shared/Navbar/Navbar.jsx'
import Insights from './Components/Insights/Insights'
import StudyMode from './Components/StudyMode/StudyMode'
import Tasks from './Components/Tasks/Tasks'
import Notes from './Components/Notes/Notes'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  useEffect(() => {
    if(!localStorage.getItem('userData') && window.location.pathname != "/login" && window.location.pathname != "/register"){
      window.location.pathname = '/login'
    }
  }, [localStorage])

  return (
    <Switch>
      <Navbar>
        <Route exact path="/tasks" component={Tasks}/>
        <Route exact path="/notes" component={Notes}/>
        <Route exact path="/study" component={StudyMode}/>
        <Route exact path="/insights" component={Insights}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Tasks}/>
      </Navbar>
    </Switch>
  );
}

export default App;
