import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Edit from '@/pages/Profile/Edit/index'
import './App.scss'
export default function App() {
  return (
    <div className='app'>
      <Switch>
          <Route path="/" exact render={()=><Redirect to='/home'/>}/>
          <Route path="/home" component={Layout}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile/edit" component={Edit}/>
      </Switch>
    </div>
  )
}
