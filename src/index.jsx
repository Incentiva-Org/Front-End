import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'


ReactDOM.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>,
  
  document.getElementById('root')
);

