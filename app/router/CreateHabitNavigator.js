/* eslint-disable no-unused-vars */
import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Easing, Animated } from 'react-native'
import MainNavigator from './MainNavigator'
import AuthorizationNavigator from './AuthorizationNavigator'
import { strings } from '../themes'
import AddHabitScreen from '../containers/AddHabitScreen'
import AddDetailHabitScreen from '../containers/AddHabitScreen/AddDetailHabitScreen'
import AddScheduleScreen from '../containers/AddHabitScreen/AddScheduleScreen'
import {
  slideInFromRight,
  slideInFromLeft,
  slideInFromTop,
  slideInFromBottom,
  getScreenInterpolator,
} from './transactionConfig'
import HobbiesScreen from '../containers/DemoHobbiesScreen/HobbiesScreen';

const transitionConfig = () => ({
  transitionSpec: transitionSpec,
  screenInterpolator: sceneProps => {
    return getScreenInterpolator(sceneProps)  
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
})

const CreateHabitNavigator = createStackNavigator(
  {
    addHabit: AddHabitScreen,
    addDetailHabit: AddDetailHabitScreen,
    addSchedule: AddScheduleScreen,
    hobbies: HobbiesScreen,
  },
  {
    initialRouteName: strings.routeAddHabit,
    headerMode: 'none',
  }
)

export default CreateHabitNavigator
