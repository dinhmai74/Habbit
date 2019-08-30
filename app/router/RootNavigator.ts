/* eslint-disable no-unused-vars */
import React from "react";
import { createSwitchNavigator } from "react-navigation";
import MainNavigator, { MainRouteName } from "./MainNavigator";
import AuthorizationNavigator, {
  AuthRouteName,
} from "./AuthorizationNavigator";
import { CreateHabitRouteName } from "./CreateHabitNavigator";

const RouteConfigs = {
  auth: AuthorizationNavigator,
  main: MainNavigator,
};

const RootNavigator = createSwitchNavigator(RouteConfigs);

export type RootRouteName =
  | keyof typeof RouteConfigs
  | AuthRouteName
  | MainRouteName
  | CreateHabitRouteName;

export default RootNavigator;
