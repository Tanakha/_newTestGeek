import { ApiResponse, Profile, User } from "@/types/data";
import { ActionType, RootThunkAction } from "@/types/store";
import http from "@/utils/request";
import { removeToken } from "@/utils/token";

export const userActionCreator = ():RootThunkAction => {
  return async(dispatch) => {
    const res = await http.get<ApiResponse<User>>('/user')
    console.log(res)
    dispatch({
      type:'profile/setUser',
      payload: res.data.data
    } as ActionType)
  }
}

export const profileActionCreator = ():RootThunkAction => {
  return async(dispatch) => {
    const res = await http.get<ApiResponse<Profile>>('/user/profile')
    dispatch({
      type:'profile/setProfile',
      payload:res.data.data
    } as ActionType)
  }
}

export const patchProfileActionCreator = (data:Partial<Profile>):RootThunkAction => {
  return async(dispatch) => {
    await http.patch('/user/profile', data)
    await dispatch(profileActionCreator())
  }
}

export const updateAvatarActionCreator = (photo:FormData):RootThunkAction => {
  console.log(photo)
  return async(dispatch) => {
    await http.patch('/user/photo',photo)
    await dispatch(profileActionCreator())
  }
}

export const logoutActionCreator = ():RootThunkAction =>{
  return async(dispatch) => {
    removeToken()
    await dispatch({
      type:'login/login',
      payload:{}
    } as ActionType)
    await dispatch({
      type:'profile/setProfile',
      payload:{}
    } as ActionType)
    await dispatch({
      type:'profile/setUser',
      payload:{}
    } as ActionType)
  }
}