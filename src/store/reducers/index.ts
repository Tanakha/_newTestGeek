import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  login:loginReducer,
  profile:profileReducer
})

export default rootReducer
