import store from "@/store"
import { ThunkAction } from "redux-thunk"

export type loginAction = {
  type:'login/login'
}

export type ActionType = loginAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void,RootState,unknown,ActionType>

