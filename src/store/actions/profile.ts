import { ApiResponse, Profile, User } from "@/types/data";
import { ActionType, RootThunkAction } from "@/types/store";
import http from "@/utils/request";

export const userActionCreator = ():RootThunkAction => {
  return async(dispatch) => {
    const res = http.get<ApiResponse<User>>('/user')
    console.log(res)
    dispatch({
      type:'profile/setUser',
      payload:(await res).data.data
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