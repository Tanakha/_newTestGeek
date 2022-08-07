// 定义登录返回数据类型
export type loginForm = {
  mobile:string,
  code:string
}

export type Token = {
  token:string,
  refresh_token:string
}
//定义个人信息类型
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
//定义个人详情类型
export type Profile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
} 

export type ApiResponse<T = any> = {
  message:string
  data:T,
}