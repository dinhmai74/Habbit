// @flow
import dataIcon from "app/model/icon.json";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import AppHeader from "../../../components/AppHeader";
import I18n from "../../../localization";
import { Images, strings } from "../../../themes";
import RenderAddDetailHabitScreen from "./RenderAddDetailHabitScreen";
import styles from "./styles";

interface IProps extends NavigationScreenProps {}

interface IState {}

export interface IHabitInfo {
  quest: string;
  timeDuration: number;
  icon: {
    name: string;
    color: string;
  };
}

export default class AddDetailHabitScreen extends Component<IProps, IState> {
  static defaultProps = {};

  rightIconOnClick = (habitInfo: IHabitInfo) => {
    this.props.navigation.navigate(strings.routeAddSchedule, {
      habitInfo,
    });
  };

  render() {
    const params = this.props.navigation.state.params;
    const titleHobbie = this.props.navigation.getParam("titleHobbie", "");
    return (
      <RenderAddDetailHabitScreen
        onNextScreen={this.rightIconOnClick}
        titleHobbie={titleHobbie}
        {...params}
      />
    );
  }
}
