import { ActionType } from "@/types/store"
import { getToken } from "@/utils/token"

const initialValue = getToken()

export default function loginReducer(
  state = initialValue,
  action:ActionType
){
  switch(action.type){
    case 'login/login':
      return action.payload
    default:
      return state
  }
}