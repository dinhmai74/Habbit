/* eslint-disable no-unused-vars */
import React from "react"
import { createSwitchNavigator, } from "react-navigation"
import MainNavigator from "./MainNavigator"
import AuthorizationNavigator from "./AuthorizationNavigator"
import { strings, } from "../themes"

const RootNavigator = createSwitchNavigator(
  {
    auth: AuthorizationNavigator,
    main: MainNavigator,
  },
  {
    initialRouteName: strings.auth,
    headerMode: "none",
  }
)

export default RootNavigator
