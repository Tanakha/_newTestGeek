import store from "@/store"
import { ThunkAction } from "redux-thunk"
import { Token } from "./data"

export type loginAction = {
  type:'login/login',
  payload:Token
}

export type codeAction = {
  type:'login/code',
  code:string
}

export type ActionType = loginAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void,RootState,unknown,ActionType>

