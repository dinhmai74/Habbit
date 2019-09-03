import {
  countDoneTaskFromOriginTask,
  countTheDoneTasksInToday,
  mapDoneAndTotalStatus,
} from "app/appRedux/reducers/RemainTasksReducer/RemainTasksReducer.helper";
import {
  pencilIcon,
  removeIcon,
  rightArrowIcon,
  scheduleIcon,
  statsIcon,
  styles,
} from "app/containers/DetailTaskScreen/DetailTaskScreen.presets";
import StreakRow from "app/containers/DetailTaskScreen/StreakRow";
import { StyledRow } from "app/containers/LifeLogScreen/renderLifeLog.presets";
import NavigateService from "app/tools/NavigateService";
import _ from "lodash";
import moment from "moment";
import { Content, Text as NativebaseText } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import { Divider, Icon } from "react-native-elements";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  NavigationInjectedProps,
  NavigationScreenProps,
} from "react-navigation";
import { connect } from "react-redux";

import { deleteTask, fetchTasks } from "app/appRedux/actions";
import {
  AppHeader,
  AppBackground,
  SizedBox,
  BorderCard,
  Text,
} from "components";
import CalendarsHabit from "app/components/Calendar/CalendarHabit";
import EditTaskLine from "app/components/EditTaskLine";
import I18n from "app/localization";
import { IArchived, IconAndNameModel, TaskRawModel } from "app/model";
import { Colors, Fonts, Images, spacing, strings } from "app/themes";
import { getPlatformElevation } from "app/tools";

type TOverlay = "scheduleShow";

interface IProps extends NavigationInjectedProps {
  deleteTask: typeof deleteTask;
  tasks: TaskRawModel;
}

interface IState {
  isModalVisible: boolean;
  scheduleShow: boolean;
  item: TaskRawModel | null;
}

class DetailTaskScreen extends Component<IProps, IState> {
  state = {
    isModalVisible: false,
    scheduleShow: true,
    item: null,
  };

  componentDidMount() {
    const item = this.props.navigation.getParam("item");
    const { tasks } = this.props;
    // @ts-ignore
    const viewTask = _.filter(tasks, task => task.id === item.id);
    this.setState({
      item: viewTask[0] || item,
    });
  }

  getDayDone = (archived: IArchived[]) =>
    _.pickBy(archived, value => {
      return value.status === "done";
    });

  countConsecutiveDays = (arr: string[]) => {
    const momentDates = arr
      .map(date => {
        return moment(date);
      })
      .sort((a, b) => a.diff(b));

    console.log(`%c momentDates`, `color: blue; font-weight: 600`, momentDates);

    const streak: any[] = [];
    let count = 0;
    let beginStreakDate = momentDates[0];
    let endStreakDate = momentDates[0];

    let isCountingStreak = false;
    for (let i = 0; i < momentDates.length; i++) {
      const current = momentDates[i];
      const next = momentDates[i + 1];

      const isConsecutive =
        current && next && this.isConsecutive(current, next);

      if (isConsecutive) {
        if (!isCountingStreak) {
          beginStreakDate = current;
          isCountingStreak = true;
        }
        endStreakDate = next;
        count += 1;
      } else {
        streak.push({
          length: count + 1,
          startDate: beginStreakDate,
          endDate: endStreakDate,
        });

        // reset
        isCountingStreak = false;
        beginStreakDate = current;
        count = 0;
      }
    }

    return streak;
  };

  isConsecutive = (currentDay, nextDay) => {
    return nextDay.diff(currentDay, "days") === 1;
  };

  getCurrentProcess() {
    let doneInTimeCycle: number;
    let totalInTimeCycle: number;
    const { item } = this.state;
    // @ts-ignore
    const { schedule } = item;
    let type = "week";
    totalInTimeCycle = schedule.times[0];
    if (schedule.type === "monthly") {
      type = "month";
    } else if (schedule.type === "daily") {
      totalInTimeCycle = schedule.times.length;
    }
    doneInTimeCycle = countDoneTaskFromOriginTask(item, type);

    return { doneInTimeCycle, totalInTimeCycle };
  }

  render() {
    const { item } = this.state;
    if (!item) {
      return <View />;
    }
    const { quest: title, archived } = item;

    const doneDays = this.getDayDone(archived);

    // @ts-ignore
    return (
      <AppBackground noImage>
        <AppHeader
          type={"transparent"}
          leftIcon={"close"}
          headerText={title}
          hasDivider={true}
        />
        <Content
          style={{ paddingHorizontal: spacing[5], paddingBottom: spacing[2] }}
        >
          {this.renderCurrentProcessInfo()}
          <SizedBox height={4} />

          <CalendarsHabit doneDays={doneDays} isCalendarDetail />

          <SizedBox height={4} />

          {this.renderStreaksInfo()}

          <SizedBox height={4} />
          {this.renderEditLines()}
        </Content>
      </AppBackground>
    );
  }

  renderStreakRow = ({ item }) => {
    console.log(`%c item`, `color: blue; font-weight: 600`, item);
    return (
      <StreakRow
        startDate={item.startDate}
        endDate={item.endDate}
        streak={item.length}
      />
    );
  };

  private renderCurrentProcessInfo() {
    const {
      schedule,
      currentStreak,
      doneInTimeCycle,
      totalInTimeCycle,
    } = this.getStreaksInfo();

    const currentStreakText = currentStreak && currentStreak.length;
    return (
      <Row>
        <BorderCard style={{ alignItems: "center", flex: 1 }}>
          <Text tx={"lifeLog.currentStreaks"} preset={"cardTitle"} />
          <SizedBox height={2} />
          <Text text={currentStreakText || "0"} preset={"bigContent"} />
        </BorderCard>

        <SizedBox width={4} />
        <BorderCard style={{ alignItems: "center", flex: 1 }}>
          <Text
            text={`${doneInTimeCycle}/${totalInTimeCycle}`}
            preset={"bigContent"}
          />
          <SizedBox height={2} />
          <Text
            // @ts-ignore
            tx={`lifeLog.${schedule.type}`}
            preset={"cardTitle"}
          />
        </BorderCard>
      </Row>
    );
  }

  private getStreaksInfo() {
    const { item } = this.state;
    // @ts-ignore
    const { archived, schedule } = item;
    const doneDays = this.getDayDone(archived);

    const doneDayStreak: string[] = [];
    _.forEach(doneDays, doneDay => {
      doneDayStreak.push(doneDay.date);
    });

    console.log("doneDayStreak", doneDayStreak);

    const streak = this.countConsecutiveDays(doneDayStreak);

    const currentStreak = streak[streak.length - 1];

    const { doneInTimeCycle, totalInTimeCycle } = this.getCurrentProcess();
    return {
      schedule,
      currentStreak,
      doneInTimeCycle,
      totalInTimeCycle,
      streak,
    };
  }

  private renderStreaksInfo = () => {
    const { streak } = this.getStreaksInfo();
    const sidePadding = 3;
    console.log(`%c streak`, `color: blue; font-weight: 600`, streak);
    return (
      <BorderCard>
        <Text
          h5
          tx={"detail.allStreaks"}
          style={{ padding: spacing[sidePadding] }}
        />
        <Divider />
        {streak.length > 0 ? (
          <FlatList
            data={streak}
            renderItem={this.renderStreakRow}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text
            tx={"detail.thereIsNoStreakYet"}
            preset="small"
            style={{ padding: spacing[sidePadding], textAlign: "center" }}
          />
        )}
      </BorderCard>
    );
  };

  private renderEditLines = () => {
    const { item } = this.state;
    const { navigation } = this.props;
    // @ts-ignore
    const { id: taskId } = item;

    return (
      <>
        <EditTaskLine
          leftIcon={pencilIcon}
          content={I18n.t(strings.nameIconTimer)}
          rightIcon={rightArrowIcon}
          onPress={() =>
            NavigateService.navigate("editIconScreen", {
              transition: strings.transitionFromTop,
              type: "edit",
              item,
            })
          }
          styles={styles}
        />
        <EditTaskLine
          leftIcon={scheduleIcon}
          content={I18n.t(strings.schedule)}
          rightIcon={rightArrowIcon}
          onPress={() =>
            this.props.navigation.navigate(strings.routeEditSchedule, {
              transition: strings.transitionFromTop,
              edit: true,
              item,
            })
          }
          styles={styles}
        />
        <EditTaskLine
          leftIcon={removeIcon}
          content={I18n.t(strings.resetOrDelete)}
          rightIcon={rightArrowIcon}
          onPress={() => {
            this.props.deleteTask(taskId);
            navigation.navigate(strings.routeHome);
          }}
          styles={styles}
        />
      </>
    );
  };
}

const mapStateToProps = store => {
  return {
    tasks: store.tasks.data,
  };
};

export default connect(
  mapStateToProps,
  { refetchTasks: fetchTasks, deleteTask }
)(DetailTaskScreen);
