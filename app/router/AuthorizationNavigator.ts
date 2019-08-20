import { createStackNavigator } from 'react-navigation'
import { AuthScreen } from '../containers/AuthScreen1';
import { LoginScreen } from '../containers/LoginScreen1';
import SignUpScreen from '../containers/SignUpScreen';

const RouteConfigs = {
  mainAuth: {
    screen: AuthScreen,
  },
  login: {
    screen: LoginScreen,
  },
  signUp: {
    screen: SignUpScreen,
  },
}

export default createStackNavigator(RouteConfigs, {
  headerMode: 'none',
})

export type AuthRouteName = keyof typeof RouteConfigs
