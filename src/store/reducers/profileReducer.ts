import { Profile, User } from "@/types/data";
import { ActionType } from "@/types/store";

type InitType = {
  user:User,
  profile:Profile
}

const initValue:InitType = {
  user:{},
  profile:{}
} as InitType

export default function profileReducer(
  state = initValue,
  action:ActionType
){
  switch(action.type){
    case "profile/setUser":
      return{
        ...state,
        user:action.payload
      }
    case 'profile/setProfile':
      return{
        ...state,
        profile:action.payload
      }
    default:
      return state
  }
}