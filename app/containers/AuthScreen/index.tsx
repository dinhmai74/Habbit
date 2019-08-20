/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { NavigationScreenProps } from 'react-navigation'

import { strings } from '../../themes'
import RenderAuthScreen from './RenderAuthScreen'

export default class AuthScreen extends Component< NavigationScreenProps> {
  async componentDidMount() {
    const result = await firebase.auth().currentUser
    if (result) { this.props.navigation.navigate(strings.routeMain) }
  }

  render() {
    return <RenderAuthScreen navigation={this.props.navigation} />
  }
}
