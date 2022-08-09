import { hasToken } from '@/utils/token'
import React, {  ComponentType } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export default function AuthRoute({component,...reset}:RouteProps) {
  const Component = component as ComponentType
  return (
    <Route
    {...reset}
    render={(props)=>{
      if(!hasToken()){
       return <Redirect to={{
        pathname:'/login',
        state:{
          from:props.location.pathname
        }
       }}/>
      }
      return <Component/>
    }}/>
  )
}
