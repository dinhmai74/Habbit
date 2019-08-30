// @flow
import _ from "lodash";
import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";

import firebase from "react-native-firebase";
import {
  createTask,
  createTaskOffline,
  editSchedule,
  fetchTasks,
  refetchTasks,
} from "../../../actions";
import FirebaseWorker from "../../../api/firebase";
import { ToastService } from "../../../components";
import I18n from "../../../localization";
import {
  IHabitItem,
  IHabitRawItem,
  TimeShift,
  TypeSchedule,
} from "../../../model";
import { strings } from "../../../themes";
import { capitalize } from "../../../tools";
import RenderAddScheduleScreen from "./RenderAddScheduleScreen";

type Props = NavigationScreenProps & {
  fetchTasks: typeof fetchTasks;
  refetchTasks: typeof refetchTasks;
  fetching: boolean;
  createTaskOffline: typeof createTaskOffline;
  createTask: typeof createTask;
  editSchedule: typeof editSchedule;
};

interface IState {
  selectedType: ScheduleType;
  times: number[] | null;
  shift: number[] | null;
  selectedTypeDefault: number[] | null;
}

const typeButtons: TypeSchedule[] = ["daily", "weekly", "monthly"];
const onTheseDaysDaily = ["M", "T", "W", "T", "F", "S", "S"];
const onTheseDaysWeekly = [1, 2, 3, 4, 5, 6];
const onTheseDaysMonthly = [1, 2, 3];
const shiftButtons: TimeShift[] = ["morning", "afternoon", "evening"];

export enum ScheduleType {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
}

class AddScheduleScreen extends Component<Props, IState> {
  state = {
    selectedType: ScheduleType.DAILY,
    times: null,
    shift: null,
    selectedTypeDefault: null,
  };

  async componentDidMount() {
    const item = this.props.navigation.getParam("item", false);
    const edit = this.props.navigation.getParam("edit", false);
    const { schedule, id: taskId } = item;
    if (edit) {
      if (schedule) {
        const { times: timesRaw } = schedule;

        const shift = this.convertArray(schedule.shift, shiftButtons);
        const type = typeButtons.indexOf(schedule.type);
        let times = timesRaw;

        const isAllTimes =
          (type === 0 && timesRaw.length === 7) ||
          (type === 1 && timesRaw.length === 6) ||
          (type === 2 && timesRaw.length === 3);

        if (isAllTimes) {
          times = [-1];
        }

        this.setState({
          selectedType: type,
          selectedTypeDefault: [type],
          times,
          shift,
        });
      }
    }
  }

  convertArray = (array, model) => {
    let result = [-1];
    if (array.length < 3) {
      result = _.map(array, e => {
        e = model.indexOf(e);
        return e;
      });
    }
    return result;
  };

  onChangeType = (index: number = 0) => {
    this.setState({
      selectedType: index,
      times: [0],
      shift: [0],
    });
  };

  onDone = async (habitSchedule: any, callback: () => void = () => {}) => {
    const convertedSchedule = this.convertSchedule(habitSchedule);
    const habit = this.convertToRawItem(convertedSchedule);
    const edit = this.props.navigation.getParam("edit", false);
    if (edit) {
      const item = this.props.navigation.getParam("item", false);
      const { id: taskId } = item;
      const user = await firebase.auth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        this.props.editSchedule(taskId, convertedSchedule.schedule, token);
        ToastService.showToast(
          I18n.t(strings.textEditScheduleSuccess),
          "success",
          () => {}
        );
      }
      // const result = await FirebaseWorker.updateSchedule(
      //   taskId,
      //   convertedSchedule.schedule,
      // )
      // if (result.error) {
      //   ToastService.showToast(I18n.t(strings.errEditScheduleFailed))
      //   setTimeout(() => {
      //     callback()
      //   }, 250)
      // } else {
      //   this.props.refetchTasks(() => {}, () => {})
      //   ToastService.showToast(
      //     I18n.t(strings.textEditScheduleSuccess),
      //     'success',
      //   )
      //   setTimeout(() => {
      //     callback()
      //   }, 250)
      // }
    } else {
      this.props.createTask(habit);
      callback();
      this.props.refetchTasks(() => {}, () => {});
      this.props.navigation.navigate(strings.routeHome);
    }
  };

  convertSchedule = (habitSchedule: any) => {
    const convertItem = { ...habitSchedule };
    convertItem.shift = habitSchedule.shift.map(e => {
      return shiftButtons[e];
    });

    return {
      schedule: {
        ...convertItem,
      },
    };
  };

  convertToRawItem = (habitSchedule: object) => {
    // @ts-ignore
    const { habitInfo } = this.props.navigation.state.params;
    const finalItem = { ...habitInfo, ...habitSchedule };
    return finalItem;
  };

  getOnTheseDays = () => {
    const { selectedType } = this.state;
    if (selectedType === ScheduleType.WEEKLY) {
      return onTheseDaysWeekly;
    }
    if (selectedType === ScheduleType.MONTHLY) {
      return onTheseDaysMonthly;
    }

    return onTheseDaysDaily;
  };

  render() {
    const { fetching } = this.props;
    const edit = this.props.navigation.getParam("edit", false);
    const item = this.props.navigation.getParam("item", false);
    const { schedule } = item;
    const onTheseDays = this.getOnTheseDays();

    const { selectedType, times, shift, selectedTypeDefault } = this.state;

    return (
      <RenderAddScheduleScreen
        typeButtons={typeButtons}
        onTheseDays={onTheseDays}
        shiftButtons={shiftButtons}
        selectedType={selectedTypeDefault}
        timesSelected={times}
        shiftSelected={shift}
        summaryOnTheseDaysText={
          selectedType === ScheduleType.DAILY
            ? capitalize(I18n.t(strings.textEveryday))
            : null
        }
        edit={edit}
        onSubmit={this.onDone}
        fetching={fetching}
        onChangeType={this.onChangeType}
      />
    );
  }
}

const mapStateToProps = state => {
  const { tasks } = state;
  return {
    tasks: tasks.data,
    error: tasks.error,
    fetching: tasks.fetching,
  };
};

export default connect(
  mapStateToProps,
  { createTask, fetchTasks, refetchTasks, createTaskOffline, editSchedule }
)(AddScheduleScreen);
