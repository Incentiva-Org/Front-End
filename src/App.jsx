import React, { useState, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getTasks } from './Actions/Tasks'

import Navbar from './Components/Shared/Navbar/Navbar.jsx'
import Insights from './Components/Insights/Insights'
import StudyMode from './Components/StudyMode/StudyMode'
import Tasks from './Components/Tasks/Tasks'
import Notes from './Components/Notes/Notes'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#805AD5"
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  return (
    <Switch>
      <ThemeProvider theme={theme}>
        <Navbar>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/notes" component={Notes}/>
          <Route path="/study" component={StudyMode}/>
          <Route path="/insights" component={Insights}/>
          <Route path="/" component={Tasks}/>
        </Navbar>
      </ThemeProvider>
    </Switch>
  );
}

export default App;
