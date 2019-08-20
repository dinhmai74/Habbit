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
  slideOutToRight,
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
  transitionSpec: transitionSpec,
  screenInterpolator: sceneProps => {
    return getScreenInterpolator(sceneProps)
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
})

const MainNavigator = createStackNavigator(
  {
    home: HomeScreen,
    setting: SettingScreen,
    lifeLog: LifeLogScreen,
    createHabit: CreateHabitNavigator,
    detailTask: DetailTaskScreen,
    editSchedule: AddScheduleScreen,
  },
  {
    initialRouteName: strings.routeHome,
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
    lazy: true,
    transitionConfig,
  }
)

export default MainNavigator
