import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
export default function App() {
  return (
    <div className='app'>
      <Switch>
          <Route path="/" exact render={()=><Redirect to='/home'/>}/>
          <Route path="/home" component={Layout}/>
          <Route path="/login" component={Login}/>
      </Switch>
    </div>
  )
}
