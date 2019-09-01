import _ from "lodash";
import moment from "moment";
import { Content, Text as NativebaseText } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  NavigationInjectedProps,
  NavigationScreenProps,
} from "react-navigation";
import { connect } from "react-redux";

import { deleteTask, fetchTasks } from "app/appRedux/actions";
import { AppHeader, AppBackground } from "components";
import CalendarsHabit from "app/components/Calendar/CalendarHabit";
import EditTaskLine from "app/components/EditTaskLine";
import I18n from "app/localization";
import { IArchived } from "app/model";
import { Colors, Fonts, Images, strings } from "app/themes";
import { getPlatformElevation } from "app/tools";

const rightArrowIcon = (
  <FontAwesome name="chevron-right" size={30} color={Colors.buttonColor} />
);
const pencilIcon = (
  <FontAwesome name="pencil" size={30} color={Colors.linearStart} />
);
const scheduleIcon = (
  <FontAwesome name="clock-o" size={30} color={Colors.bloodOrange} />
);
const removeIcon = <FontAwesome name="remove" size={30} color={Colors.fire} />;
const statsIcon = <Ionicons name="ios-stats" size={30} color={Colors.green} />;

type TOverlay = "scheduleShow";

interface IProps extends NavigationInjectedProps {
  deleteTask: typeof deleteTask;
}

interface IState {
  isModalVisible: boolean;
  scheduleShow: boolean;
}

class DetailTaskScreen extends Component<IProps, IState> {
  state = {
    isModalVisible: false,
    scheduleShow: true,
  };

  getDayDone = (archived: IArchived[]) =>
    _.pickBy(archived, value => {
      return value.status === "done";
    });

  countConsecutiveDays = (arr: string[]) => {
    const momentDates = arr
      .map(date => {
        return moment(date, "YYYY-MM-DD");
      })
      .sort((a, b) => a.diff(b));

    const streak: number[] = [];
    let count = 0;

    for (let i = 1; i < momentDates.length; i++) {
      if (this.isConsecutive(momentDates[i - 1], momentDates[i])) {
        count += 1;
      } else {
        streak.push(count + 1);
        count = 0;
      }
      if (i === momentDates.length - 1) {
        streak.push(count + 1);
        count = 0;
      }
    }
    return streak;
  };

  isConsecutive = (currentDay, nextDay) => {
    return nextDay.diff(currentDay, "days") === 1;
  };

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderModal = (currentStreak, bestStreak) => (
    <View style={styles.modalContent}>
      <Text style={styles.title}>More Stats</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              containerStyle={{
                paddingLeft: 8,
                alignSelf: "center",
              }}
              name="tonality"
              color={Colors.facebook}
              size={30}
            />
            <Text style={[styles.text, { paddingLeft: 10, paddingBottom: 5 }]}>
              {currentStreak}
            </Text>
          </View>
          <Text style={[{ paddingRight: 10, paddingLeft: 10 }]}>
            CURRENT STREAK
          </Text>
        </View>
        <View
          style={{
            height: 100,
            width: 1,
            backgroundColor: Colors.panther,
            alignSelf: "center",
          }}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              containerStyle={{
                paddingLeft: 8,
                alignSelf: "center",
              }}
              type="MaterialCommunityIcons"
              name="brightness-1"
              color={Colors.facebook}
              size={30}
            />
            <Text style={[styles.text, { paddingLeft: 10, paddingBottom: 5 }]}>
              {bestStreak}
            </Text>
          </View>
          <Text style={[{ paddingLeft: 10, paddingRight: 5 }]}>
            LONGEST STREAK
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={this.toggleModal}>
        <NativebaseText style={styles.subTitleText}>Exit</NativebaseText>
      </TouchableOpacity>
    </View>
  );

  openOverlay = (type: TOverlay) => {
    this.setState({
      [type]: true,
    });
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    const { quest: title, archived, id: taskId, icon } = item;
    const { name: iconName, color: iconColor } = icon;
    const doneDays = this.getDayDone(archived);
    const deleteTask = this.props.deleteTask;

    const doneDayStreak: string[] = [];
    _.forEach(doneDays, doneDay => {
      doneDayStreak.push(doneDay.date);
    });

    const streak = this.countConsecutiveDays(doneDayStreak);

    const currentStreak = streak[streak.length - 1];
    const bestStreak = Math.max(...streak);

    return (
      <AppBackground noImage>
        <Content>
          <AppHeader
            type={"transparent"}
            leftIcon={"back"}
            headerText={title}
          />
          <Modal isVisible={this.state.isModalVisible}>
            {this.renderModal(currentStreak, bestStreak)}
          </Modal>
          <CalendarsHabit doneDays={doneDays} isCalendarDetail />
          <EditTaskLine
            leftIcon={pencilIcon}
            content={I18n.t(strings.nameIconTimer)}
            rightIcon={rightArrowIcon}
            onPress={() =>
              navigation.navigate(strings.routeEditNameIcon, {
                transition: strings.transitionFromTop,
                taskId,
                title,
                iconName,
                iconColor,
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
              deleteTask(taskId);
              navigation.navigate(strings.routeHome);
            }}
            styles={styles}
          />
          <EditTaskLine
            leftIcon={statsIcon}
            content="More stats"
            rightIcon={rightArrowIcon}
            onPress={this.toggleModal}
            styles={styles}
          />
        </Content>
      </AppBackground>
    );
  }
}

export default connect(
  null,
  { refetchTasks: fetchTasks, deleteTask }
)(DetailTaskScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: Colors.white,
    ...getPlatformElevation(),
  },
  textWithIcon: {
    flexDirection: "row",
  },
  leftIcon: {
    marginLeft: 20,
    alignSelf: "center",
    width: 40,
  },
  rightText: {
    alignSelf: "center",
    paddingLeft: 20,
    margin: 10,
    fontFamily: Fonts.type.bold,
  },
  rightIcon: {
    color: Colors.textInBackground,
  },
  viewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
  },
  subTitleText: {
    textDecorationLine: "underline",
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    color: Colors.facebook,
    paddingTop: 30,
  },
  title: {
    color: Colors.facebook,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.input,
  },
});
