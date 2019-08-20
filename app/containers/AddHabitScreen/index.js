/* eslint-disable react/prop-types */
import React, { Component, } from "react"
import {} from "react-native"
import RenderHabitScreen from "./RenderHabitScreen"
import { strings, } from "../../themes"

export default class AddHabitScreen extends Component {
  goBack = () => {
    this.props.navigation.goBack(null)
  }

  goToAddDetailScreen = () => {
    this.props.navigation.navigate(strings.routeAddDetailHabit)
  }

  goToHobbiesScreen = () => {
    this.props.navigation.navigate(strings.routeHobbies, {
    })
  }

  render() {
    return (
      <RenderHabitScreen
        goBack={this.goBack}
        goToAddDetailScreen={this.goToAddDetailScreen}
        goToHobbiesScreen={this.goToHobbiesScreen}
      />
    )
  }
}
