import { createStackNavigator } from 'react-navigation'
import { Easing, Animated } from 'react-native'

import HomeScreen from '../containers/HomeScreen'
import SettingScreen from '../containers/SettingScreen'
import LifeLogScreen from '../containers/LifeLogScreen'
import { strings } from '../themes'
import {
  slideInFromBottom,
  slideInFromRight,
  slideInFromLeft,
  slideInFromTop,
  transitionSpec,
  scaleWithOpacity,
  getOpacity,
  getScreenInterpolator,
} from './transactionConfig'

import AddHabitScreen from '../containers/AddHabitScreen'
import AddDetailHabitScreen from '../containers/AddHabitScreen/AddDetailHabitScreen'
import AddScheduleScreen from '../containers/AddHabitScreen/AddScheduleScreen'
import HobbiesScreen from '../containers/DemoHobbiesScreen/HobbiesScreen'
import DetailTaskScreen from '../containers/DetailTaskScreen/DetailTaskScreen'
import CreateHabitNavigator from './CreateHabitNavigator'
import EditNameIconScreen from '../containers/EditNameIcon/EditNameIconScreen'

const transitionConfig = () => ({
  transitionSpec,
  screenInterpolator: (sceneProps) => {
    return getScreenInterpolator(sceneProps)
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
})

const RouteConfigs = {
  home: HomeScreen,
  setting: SettingScreen,
  lifeLog: LifeLogScreen,
  createHabit: CreateHabitNavigator,
  detailTask: DetailTaskScreen,
  editSchedule: AddScheduleScreen,
}

const MainNavigator = createStackNavigator(RouteConfigs, {
  initialRouteName: strings.routeHome,
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig,
})

export type MainRouteName = keyof typeof RouteConfigs

export default MainNavigator
