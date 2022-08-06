import { Token } from "@/types/data"

const myGeekToken_key = 'geek-h5-token'

export const setToken = (token:Token) =>{
  localStorage.setItem(myGeekToken_key,JSON.stringify(token))
}

export const getToken = ():Token => {
  return JSON.parse(localStorage.getItem(myGeekToken_key) || '{}' )
}

export const removeToken = () => {
  localStorage.removeItem(myGeekToken_key)
}

export const hasToken = ():boolean => {
  return !!getToken().token
}