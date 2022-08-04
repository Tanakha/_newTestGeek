import http from "@/utils/request"
import { loginForm,ApiResponse, Token } from "@/types/data"
import { loginAction, RootThunkAction } from "@/types/store"
import { setToken } from "@/utils/token"
import { CodeAction } from "typescript"


export const loginActionCreator = (values:loginForm):RootThunkAction => {
  return async(dispatch) => {
    const res = await http.post<ApiResponse<Token>>('/authorizations',values)
    
    dispatch({
      type:'login/login',
      payload:res.data.data
    } as loginAction )

    setToken(res.data.data)
  }
}

export const codeActionCreator = (mobile:CodeAction):RootThunkAction => async() => await http.get('/sms/codes/' + mobile)