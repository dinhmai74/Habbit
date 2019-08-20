/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import App from './app/containers/app';
import App from './App'
import { name as appName } from './app.json'

import React, { Component } from 'react'
import {
  AppRegistry,
} from 'react-native'

// AppRegistry.registerComponent('weatherAnimation', () => weatherAnimation);

AppRegistry.registerComponent(appName, () => App)
// AppRegistry.registerComponent(appName, () => App);
