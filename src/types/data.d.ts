// 定义登录返回数据类型
export type loginForm = {
  mobile:string,
  code:string
}

export type Token = {
  token:string,
  refresh_token:string
}

export type ApiResponse<T = any> = {
  message:string
  data:T,
}