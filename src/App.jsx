import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import {auth} from "./API/Auth/Firebase"
import {reloadUser} from "./API/Auth/AuthProvider"

import Navbar from './Components/Shared/Navbar/Navbar.jsx'
import Insights from './Components/App/Insights/Insights'
import StudyMode from './Components/App/StudyMode/StudyMode'
import Tasks from './Components/App/Tasks/Tasks'
import Friends from './Components/App/Friends/Friends'
import Notes from './Components/App/Notes/Notes'
import Register from './Components/Shared/Register/Register'
import ForgotPassword from './Components/Shared/ForgotPassword/ForgotPassword'
import Login from './Components/Shared/Login/Login'
import Landing from './Components/Homepage/Landing/Landing'
import About from './Components/Homepage/About/About'
import Contact from './Components/Homepage/Contact/Contact'
import Team from './Components/Homepage/Team/Team'


const App = () => {
 
  const needLogIn = ["/tasks", "/notes", "/study", "/insights"]

  if(needLogIn.includes(window.location.pathname)){
    if(!localStorage.getItem("userData")){ window.location.pathname = "/login" }
  }

  useEffect(() => {
    reloadUser()
    const unsubscribe = auth.onAuthStateChanged(user => {if(user.email){localStorage.setItem('userData', JSON.stringify(user))}})
    return unsubscribe
  }, [])
  
  if(JSON.parse(localStorage.getItem('userData')) == null){
    localStorage.removeItem('userData')
  }


  return (
    <Switch>
      <Navbar>
        <Route exact path="/tasks" component={Tasks}/>
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
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
