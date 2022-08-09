import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import './index.scss'
import {  Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store";
import history from "./utils/history";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router> 
  </Provider>  
)