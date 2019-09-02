// @flow
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import _ from "lodash";
import React, { Component } from "react";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import Firebase from "react-native-firebase";
import {
  createTaskOffline,
  deleteTask,
  editTaskStatus,
  fetchTasks,
  refetchTasks,
} from "app/appRedux/actions";
import I18n from "localization";
import { today } from "app/tools";
import HomeRender from "./renderHomeScreen";

import { NetInfo, Alert } from "react-native";
import firebase from "react-native-firebase";
import { ToastService, RenderWaitingScreen } from "components";
import { TaskFormattedModel, TaskRawModel, ArchivedTaskModel } from "model";
import { strings } from "app/themes";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  fetching: boolean;
  data: any[];
  error: boolean;
  fetchTasks: typeof fetchTasks;
  editTaskStatus: typeof editTaskStatus;
  deleteTask: (arg1: string, ...restOfArg1: Function[]) => void;
  offlineCreateTask: typeof createTaskOffline;
}

interface IState {
  watchingDate: string;
  tasksConvert: TaskFormattedModel[] | null | undefined;
}

export interface IDateItem {
  date: string;
  id: string;
}

class HomeScreen extends Component<IProps, IState> {
  static defaultProps = {};

  state = {
    watchingDate: today,
    tasksConvert: null,
  };

  /**
   * fields
   */

  willFocusListener: any = null;

  /**
   * lifecycle
   */

  componentDidMount() {
    this.handleRefresh();
  }

  /**
   * Private methods
   */
  refresh: Function = () => {};

  rightIconOnClick = () => {
    const { navigation } = this.props;
    navigation.navigate(strings.routeSetting, {
      transition: strings.transitionFromRight,
    });
  };

  leftIconOnClick = () => {
    const { navigation } = this.props;
    navigation.navigate(strings.routeLifeLog, {
      transition: strings.transitionFromLeft,
      refresh: this.refresh,
    });
  };

  addButtonOnPress = () => {
    this.props.navigation.navigate(strings.routeCreateHabit, {
      transition: strings.transitionFromBottom,
      refresh: this.refresh,
    });
  };

  updateTaskStatus = async (
    taskId: string,
    status: ArchivedTaskModel,
    date: string
  ) => {
    const user = await firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      this.props.editTaskStatus(taskId, status, date, token);
    }
  };

  deleteTask = (taskId: string) => {
    this.props.deleteTask(taskId, () => this.handleRefresh(), () => {});
  };

  onCardPress = (item: TaskFormattedModel) => {
    // tslint:disable-next-line: no-shadowed-variable
    const deleteTask = this.deleteTask;
    this.props.navigation.navigate(strings.routeDetailTask, {
      transition: strings.transitionFromTop,
      item,
      deleteTask,
    });
  };

  /**
   * private methods
   */

  getStatusFromTask = (task: TaskRawModel, date: string): string => {
    let status = "spending";
    const final = _.filter(task.archived, (value: any) => {
      if (value.date === date) {
        if (value.status === "overdue" && date === today) {
          value.status = "skipped";
        }
        return value;
      }
      return null;
    });

    if (final.length > 0) {
      // @ts-ignore
      if (final[0].status) {
        // @ts-ignore
        status = final[0].status;
      }
    } else {
      return "";
    }
    if (status === "done" && date !== today) {
      return "";
    }

    return status;
  };

  convertData = (
    data: TaskRawModel[],
    date: string = today
  ): TaskFormattedModel[] => {
    // @ts-ignore
    data = _.filter(data, (e: any) => {
      const status = this.getStatusFromTask(e, date);
      if (status) {
        return e;
      }
    });

    return _.map(data, (u: any) => {
      const status: any = this.getStatusFromTask(u, date);

      const { icon } = u;
      let iconName = "user";
      let iconColor = "#000";
      if (icon) {
        iconName = icon.name;
        iconColor = icon.color;
      }

      return {
        ...u,
        status,
        icon: {
          name: iconName,
          color: iconColor,
        },
        date: this.state.watchingDate,
      };
    });
  };

  /**
   * Handle events
   */
  handleRefresh = async () => {
    const netInfo = await NetInfo.getConnectionInfo();
    if (netInfo.type === "none" || netInfo.type === "unknown") {
      const message = I18n.t(strings.errMessInternetProblems);
      ToastService.showToast(message, "warning");
      return;
    }

    this.props.fetchTasks(
      // @ts-ignore
      data => {
        this.setState({
          tasksConvert: this.convertData(data, this.state.watchingDate),
        });
      },
      (error: any) => {
        // eslint-disable-next-line no-alert
        if (error.message === undefined) {
          ToastService.showToast(
            "You must sign in",
            "success",
            () => {
              Firebase.auth().signOut();
              this.props.navigation.navigate(strings.routeMainAuth);
            },
            "top",
            1000
          );
        }
      }
    );
  };

  onChangeDate = (item: any) => {
    this.setState({
      watchingDate: item.date,
    });
  };

  render() {
    const { fetching, data, error } = this.props;
    const { watchingDate } = this.state;

    const tasksDisplay = this.convertData(data, watchingDate);
    if (fetching) {
      return (
        <RenderWaitingScreen
          handleRefresh={this.handleRefresh}
          fetching={fetching}
        />
      );
    }

    return (
      <HomeRender
        rightIconOnClick={this.rightIconOnClick}
        leftIconOnClick={this.leftIconOnClick}
        addButtonOnPress={this.addButtonOnPress}
        // @ts-ignore
        updateTaskStatus={this.updateTaskStatus}
        onCardPress={this.onCardPress}
        onChangeDate={this.onChangeDate}
        taskData={tasksDisplay}
        watchingDate={watchingDate}
        error={error}
        navigation={this.props.navigation}
        deleteTask={this.deleteTask}
        refresh={this.handleRefresh}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const { tasks } = state;
  return {
    data: tasks.data,
    error: tasks.error,
    fetching: tasks.fetching,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchTasks,
    editTaskStatus,
    deleteTask,
    refetchTasks,
    offlineCreateTask: createTaskOffline,
  }
)(HomeScreen);
