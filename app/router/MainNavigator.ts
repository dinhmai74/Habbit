import { createStackNavigator } from "react-navigation";

import HomeScreen from "../containers/HomeScreen";
import SettingScreen from "../containers/SettingScreen";
import LifeLogScreen from "../containers/LifeLogScreen";
import { strings } from "../themes";
import { transitionSpec, getScreenInterpolator } from "./transactionConfig";

import AddDetailHabitScreen from "../containers/AddHabitScreen/AddDetailHabitScreen";
import AddScheduleScreen from "../containers/AddHabitScreen/AddScheduleScreen";
import DetailTaskScreen from "../containers/DetailTaskScreen/DetailTaskScreen";
import CreateHabitNavigator from "./CreateHabitNavigator";

const transitionConfig = () => ({
  transitionSpec,
  screenInterpolator: sceneProps => {
    return getScreenInterpolator(sceneProps);
  },
  containerStyle: {
    backgroundColor: "transparent",
  },
});

const RouteConfigs = {
  home: HomeScreen,
  setting: SettingScreen,
  lifeLog: LifeLogScreen,
  createHabit: CreateHabitNavigator,
  detailTask: DetailTaskScreen,
  editSchedule: AddScheduleScreen,
  editIconScreen: AddDetailHabitScreen,
};

const MainNavigator = createStackNavigator(RouteConfigs, {
  initialRouteName: strings.routeHome,
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig,
});

export type MainRouteName = keyof typeof RouteConfigs;

export default MainNavigator;
