import { ApiResponse } from "@/types/data";
import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";
import { getToken } from "./token";

const http = axios.create({
  baseURL:'http://geek.itheima.net/v1_0/',
  timeout:3500
})

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
http.interceptors.response.use((response) => {
  return response
},(error:AxiosError<ApiResponse>) => {
  if(!error){
    Toast.show('服务器繁忙')
  }else{
    Toast.show({
      content:error.response?.data.message,
      icon:'fail'
    })
  }
  return Promise.reject(error)
})

export default http