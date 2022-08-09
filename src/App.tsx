import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Edit from '@/pages/Profile/Edit/index'
import './App.scss'
import AuthRoute from './components/AuthRoute'
import Chat from './pages/Profile/Chat'
export default function App() {
  return (
    <div className='app'>
      <Switch>
          <Route path="/" exact render={()=><Redirect to='/home'/>}/>
          <Route path="/home" component={Layout}/>
          <Route path="/login" component={Login}/>
          <AuthRoute path="/profile/edit" component={Edit}/>
          <AuthRoute path="/chat" component={Chat}/>
      </Switch>
    </div>
  )
}
