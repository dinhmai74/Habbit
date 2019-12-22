import React, { PureComponent } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
// import { Button } from 'react-native';
import moment from "moment";
import DateButton from "./DateButton";
import { Colors, spacing } from "../../themes";
import {
  getPlatformElevation,
  formatDate,
  getPreviousDateFromNow,
  getFirstCharacterOfDate,
} from "../../tools";

const curDay = new Date();
const todayInNum = curDay.getDay();
const days = ["S", "M", "T", "W", "T", "F", "S"];

type Props = {
  onDateChange?: Function,
};

export default class DateSelection extends PureComponent<Props> {
  static defaultProps = {
    onDateChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedKey: todayInNum,
      data: [
        {
          key: todayInNum + 1,
          date: getPreviousDateFromNow(6),
        },
        {
          key: todayInNum + 2,
          date: getPreviousDateFromNow(5),
        },
        {
          key: todayInNum + 3,
          date: getPreviousDateFromNow(4),
        },
        {
          key: todayInNum + 4,
          date: getPreviousDateFromNow(3),
        },
        {
          key: todayInNum + 5,
          date: getPreviousDateFromNow(2),
        },
        {
          key: (todayInNum + 6) % 7,
          date: getPreviousDateFromNow(1),
        },
        {
          key: todayInNum,
          date: getPreviousDateFromNow(0),
        },
      ],
      today: todayInNum,
    };
  }

  onChangeChecked = item => {
    this.setState({ checkedKey: item.key });
    this.props.onDateChange(item);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.state.data.map(item => {
          return (
            <DateButton
              key={item.key}
              day={item.key}
              item={item}
              isToday={this.state.today === item.key}
              checkedKey={this.state.checkedKey}
              onChange={this.onChangeChecked}
            />
          );
        })}
      </View>
    );
  }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const isIphoneX =
  Platform.OS === "ios" && (deviceHeight === 812 || deviceWidth === 812);

const paddingBottomIPX = isIphoneX && { paddingBottom: spacing[5]};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dateSelectionBackgroundInactive,
    ...getPlatformElevation(),
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    ...paddingBottomIPX,
  },
});
