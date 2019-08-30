/* eslint-disable no-return-assign */
// @ts-nocheck
import { Content, H3, Image, Spinner, Text } from "native-base";
import React, { Component } from "react";
import { LayoutAnimation, UIManager } from "react-native";

import {
  AppBackground,
  AppHeader,
  CardContainer,
  IconTypes,
} from "../../../components";
import AppLoading from "../../../components/AppLoading";
import I18n from "../../../localization";
import { TimeShiftType, TypeSchedule } from "../../../model";
import { ApplicationStyles, Colors, Images, strings } from "../../../themes";
import { capitalize } from "../../../tools";
import ScheduleSelection from "./components/ScheduleSelection";
import styles from "./styles";

interface State {
  loading: boolean;
}

interface Props {
  onSubmit: (value: any, callback?: () => void) => void;
  onChangeType: () => void;
  typeButtons: TypeSchedule[];
  onTheseDays: any[];
  summaryOnTheseDaysText: string | null | undefined;
  timesSelected: number[] | null;
  shiftSelected: number[] | null;
  selectedType: number | null;
  shiftButtons: TimeShiftType[];
  fetching: boolean;
  edit: boolean;
}

export default class RenderAddScheduleScreen extends Component<Props, State> {
  static defaultProps = {
    selectedType: 0,
    timesSelected: null,
    shiftSelected: null,
  };

  state = {
    loading: false,
  };

  refShift: any;

  refTimeDoes: any;

  refTypeHabit: any;

  componentWillUpdate() {
    // tslint:disable-next-line: no-unused-expression
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  rightTitleOnPress = () => {
    const values = this.getAllValue();
    this.props.onSubmit(values);
  };

  getAllValue = () => {
    const { typeButtons } = this.props;
    const habitSchedule: any = {};
    if (this.refTypeHabit) {
      const index = this.refTypeHabit.getSelectedIndex();
      const value = typeButtons[index];
      habitSchedule.type = value;
    }
    if (this.refTimeDoes) {
      let indexes = this.refTimeDoes.getSelectedIndex();
      if (indexes[0] === -1) {
        if (habitSchedule.type === "daily" || habitSchedule.type === "weekly") {
          indexes = [0, 1, 2, 3, 4, 5, 6];
        } else if (habitSchedule.type === "monthly") {
          indexes = [0, 1, 2, 3];
        }
      }
      habitSchedule.times = indexes;
    }
    if (this.refShift) {
      let indexes = this.refShift.getSelectedIndex();
      if (indexes[0] === -1) {
        indexes = [0, 1, 2];
      }
      habitSchedule.shift = indexes;
    }

    return habitSchedule;
  };

  renderRightHeader = () => {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Text style={styles.buttonText} onPress={this.rightTitleOnPress}>
        {capitalize(I18n.t(strings.textDone))}
      </Text>
    );
  };

  render() {
    const {
      typeButtons,
      onTheseDays,
      shiftButtons,
      fetching,
      summaryOnTheseDaysText,
      edit,
      timesSelected,
      selectedType,
      shiftSelected,
    } = this.props;

    const leftIcon: IconTypes = edit ? "close" : "back";
    return (
      <AppBackground isLinear>
        {// @ts-ignore
        fetching ? <AppLoading fetching={fetching} /> : null}
        <AppHeader
          leftIcon={leftIcon}
          headerText={I18n.t(strings.titleAddSchedule)}
          color={Colors.white}
          type={"transparent"}
          rightIcon={this.renderRightHeader()}
        />
        <CardContainer>
          <Content style={styles.container}>
            <ScheduleSelection
              ref={c => (this.refTypeHabit = c)}
              // @ts-ignore
              buttons={typeButtons}
              // @ts-ignore
              selected={selectedType}
              title={capitalize(I18n.t(strings.textIWantRepeat))}
              onSelected={this.props.onChangeType}
            />

            <ScheduleSelection
              ref={c => (this.refTimeDoes = c)}
              buttons={onTheseDays}
              title={I18n.t(strings.textOnTheseDay)}
              summaryText={summaryOnTheseDaysText || ""}
              selected={timesSelected}
              type={summaryOnTheseDaysText ? "multiple" : "one"}
            />
            <ScheduleSelection
              ref={c => {
                this.refShift = c;
              }}
              buttons={shiftButtons}
              selected={shiftSelected}
              title={I18n.t(strings.textIWillDoIt)}
              summaryText={capitalize(I18n.t(strings.textOnceOfAnyTime))}
              type="multiple"
            />
          </Content>
        </CardContainer>
      </AppBackground>
    );
  }
}
