import { createStackNavigator, } from "react-navigation"
import LoginScreen from "../containers/LoginScreen"
import AuthScreen from "../containers/AuthScreen"
import SignUpScreen from "../containers/SignUpScreen"

export default createStackNavigator(
  {
    mainAuth: {
      screen: AuthScreen,
    },
    login: {
      screen: LoginScreen,
    },
    signUp: {
      screen: SignUpScreen,
    },
  },
  {
    headerMode: "none",
  }
)
