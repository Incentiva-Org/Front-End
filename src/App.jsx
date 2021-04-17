import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getTasks } from './API/index'

import Navbar from './Components/Shared/Navbar/Navbar.jsx'
import Insights from './Components/App/Insights/Insights'
import StudyMode from './Components/App/StudyMode/StudyMode'
import Tasks from './Components/App/Tasks/Tasks'
import Friends from './Components/App/Friends/Friends'
import Notes from './Components/App/Notes/Notes'
import Register from './Components/Shared/Register/Register'
import Login from './Components/Shared/Login/Login'
import Landing from './Components/Homepage/Landing/Landing'
import About from './Components/Homepage/About/About'
import Contact from './Components/Homepage/Contact/Contact'
import Team from './Components/Homepage/Team/Team'


const App = () => {
 
  const needLogIn = ["/tasks", "/notes", "/study", "insights"]

  if(needLogIn.includes(window.location.pathname)){
    if(!localStorage.getItem("userData")){ window.location.pathname = "/login" }
  }

  return (
    <Switch>
      <Navbar>
        <Route exact path="/tasks" component={Tasks}/>
        <Route exact path="/notes" component={Notes}/>
        <Route exact path="/friends" component={Friends}/>
        <Route exact path="/study" component={StudyMode}/>
        <Route exact path="/insights" component={Insights}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/team" component={Team}/>
        <Route exact path="/" component={Landing}/>
      </Navbar>
    </Switch>
  );
}

export default App;
