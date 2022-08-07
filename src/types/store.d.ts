import store from "@/store"
import { ThunkAction } from "redux-thunk"
import { Profile, Token, User } from "./data"

export type loginAction = {
  type:'login/login',
  payload:Token
}

export type codeAction = {
  type:'login/code',
  code:string
}

export type userAction = {
  type:'profile/setUser',
  payload:User
}

export type profileAction = {
  type:'profile/setProfile',
  payload:Profile
}

export type ActionType = loginAction | userAction | profileAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void,RootState,unknown,ActionType>

