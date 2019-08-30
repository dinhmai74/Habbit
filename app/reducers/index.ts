import { combineReducers } from "redux";
import TaskReducer from "./homeReducers/TaskReducer";
import LoginReducer from "./authentication/LoginReducer";
import SignUpReducer from "./authentication/SignUpReducer";
import LifeLogReducer from "./lifeLogReducer/LifeLogReducer";
import HabitReducer from "./homeReducers/NewHabitReducer";
import GoogleLoginReducer from "./authentication/GoogleLoginReducer";
import FacebookLoginReducer from "./authentication/FacebookLoginReducer";

export * from "./RemainTasks";

export default combineReducers({
  tasks: TaskReducer,
  habits: HabitReducer,
  loginInfo: LoginReducer,
  signUpInfo: SignUpReducer,
  lifeLog: LifeLogReducer,
  googleLoginInfor: GoogleLoginReducer,
  facebookLoginInfor: FacebookLoginReducer,
  remainTasks: require("./RemainTasks").reducer,
});
