/* eslint-disable no-unused-vars */
import React from "react";
import { createStackNavigator } from "react-navigation";
import { Easing, Animated } from "react-native";
import MainNavigator from "./MainNavigator";
import AuthorizationNavigator from "./AuthorizationNavigator";
import { strings } from "../themes";
import AddHabitScreen from "../containers/AddHabitScreen";
import AddDetailHabitScreen from "../containers/AddHabitScreen/AddDetailHabitScreen";
import AddScheduleScreen from "../containers/AddHabitScreen/AddScheduleScreen";
import {
  slideInFromRight,
  slideInFromLeft,
  slideInFromTop,
  slideInFromBottom,
  getScreenInterpolator,
} from "./transactionConfig";
import HobbiesScreen from "../containers/DemoHobbiesScreen/HobbiesScreen";

const RouteConfigs = {
  addHabit: AddHabitScreen,
  addDetailHabit: AddDetailHabitScreen,
  addSchedule: AddScheduleScreen,
  hobbies: HobbiesScreen,
};

const CreateHabitNavigator = createStackNavigator(RouteConfigs, {
  initialRouteName: strings.routeAddHabit,
  headerMode: "none",
});
export type CreateHabitRouteName = keyof typeof RouteConfigs;

export default CreateHabitNavigator;
