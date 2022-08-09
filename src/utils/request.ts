import store from "@/store";
import { ApiResponse, Token } from "@/types/data";
import { ActionType } from "@/types/store";
import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";
import history from "./history";
import { getToken, removeToken, setToken } from "./token";

const http = axios.create({
  baseURL:'http://geek.itheima.net/v1_0/',
  timeout:3500
})

const baseURL = 'http://geek.itheima.net/v1_0/'

// 添加请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken()
  if(token){
    config.headers!.Authorization = 'Bearer ' + token.token
  }
  return config
},(error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
// 添加响应拦截器
// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response
  },
  async (error: AxiosError<{ message: string }>) => {
    // 无响应的情况
    if (!error.response) {
      Toast.show('服务器繁忙，请稍后再试')
      return Promise.reject(error)
    }

    // 1. 判断状态是否是 401
    if (error.response.status === 401) {
      const token = getToken()

      // 2. 判断是否有 token 和 refresh token
      if (token.token && token.refresh_token) {
        try {
          // 2.1 使用默认的 axios 发送用 refresh token 换取新 token 的请求【重要】
          const res = await axios.put<ApiResponse<Token>>(
            `${baseURL}authorizations`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token.refresh_token}`
              }
            }
          )
          // 2.2 换取新 token 成功，将 token 存入本地缓存和 Redux 中
          const newToken: Token = {
            token: res.data.data.token,
            refresh_token: token.refresh_token
          }
          
          setToken(newToken)
          
          store.dispatch({
            type: 'login/login',
            payload: newToken
          })

          // 2.3 重新发送之前的请求
          return http(error.response.config)
        } catch {
          // 清除 token，并跳转到登录页
          removeToken()

          store.dispatch({
            type: "login/login",
            payload: {},
          } as ActionType)
          
          history.push('/login', {
            from: history.location.pathname
          })
        }
      }

      // 3. 没有 token 或 refresh token 的情况
      else {
        // 清除 token，并跳转到登录页
        removeToken()

        store.dispatch({
          type: "login/login",
          payload: {},
        } as ActionType)
        
        history.push('/login', {
          from: history.location.pathname
        })
      }
    }

    // 有响应，并返回错误信息的情况
    Toast.show(error.response.data.message)

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default http