import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import Swipeable from "react-native-swipeable";
import styled from "styled-components";
import Feather from "react-native-vector-icons/Feather";

import { Button } from "native-base";
import { Icon } from "react-native-elements";
import firebase from "react-native-firebase";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { editTaskStatus } from "app/appRedux/actions";
import {
  AppIcon,
  AppText,
  CardItem,
  icons,
  IconTypes,
  RowView,
  Text,
  SizedBox,
} from "components";
import ModalTask from "app/components/Modal";
import I18n from "localization";
import {
  IArchived,
  TaskFormattedModel,
  TaskRawModel,
  TimeShiftType,
} from "model";
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Metrics,
  spacing,
  strings,
} from "../../../themes";
import { capitalize, switchcase } from "tools";
import { getTokenString } from "app/api/firebase";
import moment from "moment";

const SubIconEnum = {
  close: "close",
  star: "star",
  check: "check",
};

interface IProps {
  status: string;
  style?: object;
  leftText?: string;
  rightText?: string;
  onCardPress: (detailCardInfo: TaskRawModel, ...rest: any) => void;
  leftButtonOnClick?: () => void;
  rightButtonOnClick?: () => void;
  releaseTime?: number;
  navigation: NavigationScreenProp<any, any>;
  cardInfo: TaskRawModel;
  editTaskStatus: typeof editTaskStatus;
  taskDate: string;
  deleteTask: Function;
}

class HabitCard extends Component<IProps> {
  static defaultProps = {
    style: null,
    color: Colors.text.text,
    leftText: capitalize(I18n.t(strings.textDone)),
    rightText: capitalize(I18n.t(strings.textSkip)),
    onCardPress: () => {
    },
    leftButtonOnClick: () => {
    },
    rightButtonOnClick: () => {
    },
    releaseTime: 200,
  };

  state = {
    isSwiped: false,
    status: "",
  };
  refSwipeable: any;
  refModalTask: any;
  refRightButton: any;

  componentDidMount() {
    this.setState({
      status: this.props.status,
    });
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.status !== this.state.status) {
      this.setState({ status: nextProps.status });
    }
  }

  resetState = () => {
    this.setState({
      isSwiped: false,
    });
  };

  leftButtonRelease = () => {
    setTimeout(() => {
      this.setState(
        {
          isSwiped: true,
          status: "done",
        },
        () => {
          if (this.props.leftButtonOnClick) {
            this.props.leftButtonOnClick();
          }
          if (this.refSwipeable) {
            this.refSwipeable.recenter();
          }
        },
      );
    }, this.props.releaseTime);
  };

  rightButtonRelease = () => {
    setTimeout(() => {
      this.setState(
        {
          isSwiped: true,
          status: "skipped",
        },
        () => {
          if (this.props.rightButtonOnClick) {
            this.props.rightButtonOnClick();
          }
          if (this.refSwipeable) {
            this.refSwipeable.recenter();
          }
        },
      );
    }, this.props.releaseTime);
  };

  rightButtonOnClick = () => {
    this.setState({
      isSwiped: true,
      status: "skipped",
    });
    if (this.props.rightButtonOnClick) {
      this.props.rightButtonOnClick();
    }
  };

  undoOnModal = async (taskId: string, status: IArchived, date: string) => {
    const user = await firebase.auth().currentUser;
    let token = "";
    if (user) {
      token = await user.getIdToken();
    }
    this.setState(
      {
        status: "spending",
      },
      () => {
        if (token) {
          this.props.editTaskStatus(taskId, "spending", date, token);
        }
      },
    );
  };

  viewDetail = () => {
    const { cardInfo } = this.props;
    this.props.onCardPress(cardInfo);
  };

  containerPress = () => {
    const { status } = this.state;

    const isInActiveCard = status === "done" || status === "skipped";

    if (isInActiveCard) {
      this.refModalTask.showModal();
    } else {
      const { cardInfo } = this.props;
      this.props.onCardPress(cardInfo);
    }
  };

  getIconShift = () => {
    const { cardInfo } = this.props;
    const currentTime = new Date().getHours();

    let shift: TimeShiftType = "evening";
    let icon: IconTypes = "sun";

    // if (currentTime >= 4 && currentTime <= 6) {
    //   shift = "morning";
    //   icon = "sunrise";
    // } else if (currentTime > 6 && currentTime < 12) {
    //   shift = "morning";
    //   icon = "sun";
    // } else if (currentTime >= 12 && currentTime <= 18) {
    //   shift = "afternoon";
    // } else if (currentTime > 18 && currentTime < 4) {
    //   shift = "evening";
    //   icon = "moon";
    // }

    switchcase({
      morning: icon = "cloud",
      afternoon: icon = "sun",
      evening: icon = "moon",
    })((icon = "moon"))(cardInfo.schedule.shift[0]);

    return <AppIcon icon={icon} size={Metrics.icon.big} />;
  };

  renderLeftButtons = () => [
    <LeftSwipeView>
      <Button
        style={[styles.button, styles.leftButton]}
        // @ts-ignore
        onPress={this.props.leftButtonOnClick}
      >
        <Text
          // @ts-ignore
          style={ApplicationStyles.text.textButton}
        >
          {this.props.leftText}
        </Text>
      </Button>
    </LeftSwipeView>,
  ];

  renderRightButtons = () => [
    <RightSwipeView>
      <Button
        style={styles.button}
        onPress={this.rightButtonOnClick}
        transparent
      >
        <Text
          // @ts-ignore
          style={ApplicationStyles.text.textButton}
        >
          {this.props.rightText}
        </Text>
      </Button>
    </RightSwipeView>,
  ];

  render() {
    const { style, cardInfo } = this.props;
    const { quest: title, icon } = cardInfo;
    const { name: iconName, color } = icon;
    const { status } = this.state;

    let subTitleIcon = SubIconEnum.star;
    if (status === "done") {
      subTitleIcon = SubIconEnum.check;
    } else if (status === "overdue" || status === "skipped") {
      subTitleIcon = SubIconEnum.close;
    }

    const isDisable = status === "skipped" || status === "done";

    const colorToggle = isDisable ? Colors.inActiveText : null;
    const leftButtons = isDisable ? null : this.renderLeftButtons();
    const rightButtons = isDisable ? null : this.renderRightButtons();
    const textInactiveColor = isDisable ? { color: Colors.inActiveText } : null;
    const iconShift = this.getIconShift();

    const length = 12;
    let trimTitle = "";
    if (title) {
      trimTitle =
        title.length > length ? `${title.substring(0, length)}...` : title;
    }

    return (
      // @ts-ignore
      <Container style={style} ref={(c: any) => (this.refRightButton = c)}>
        <ModalTask
          ref={c => {
            this.refModalTask = c;
          }}
          habitCardProp={this.props}
          // @ts-ignore
          contentStyle={styles.modal}
          undoOnModal={this.undoOnModal}
          viewDetail={this.viewDetail}
          status={status}
        />
        <Swipeable
          onRef={(ref: any) => (this.refSwipeable = ref)}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
          leftButtonWidth={100}
          rightButtonWidth={100}
          onLeftButtonsOpenRelease={this.leftButtonRelease}
          onRightButtonsOpenRelease={this.rightButtonRelease}
        >
          <Grid>
            <Row
              onPress={this.containerPress}
              style={{ paddingHorizontal: spacing[3] }}
            >
              <Col size={1} style={styles.leftCol}>
                <Icon
                  type="MaterialCommunityIcons"
                  name={iconName}
                  iconStyle={{ color: colorToggle || color }}
                  containerStyle={styles.icon}
                  color="transparent"
                  size={Metrics.icons.medium}
                  reverse
                />
              </Col>

              <Col size={5} style={styles.centerView}>
                <Row style={{ padding: 0, paddingTop: spacing[2] }}>
                  <Text style={[styles.title, textInactiveColor]}>
                    {capitalize(trimTitle)}
                  </Text>
                </Row>
                <Row style={{ padding: 0 }}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name={subTitleIcon}
                    color={colorToggle || color}
                    size={20}
                    containerStyle={{ marginRight: spacing[2] }}
                  />
                  <Text style={textInactiveColor}>{status}</Text>
                </Row>
              </Col>
              <Col style={styles.rightCol}>{iconShift}</Col>
            </Row>
          </Grid>
        </Swipeable>
      </Container>
    );
  }
}

const Container = styled(CardItem)`
  padding: 0;
`;

const LeftSwipeView = styled(View)`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 20px;
  margin-right: 20px;
  background: ${Colors.green};
`;

const RightSwipeView = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-left: 20px;
  margin-right: 20px;
  background: ${Colors.buttonColorInColoredBackground};
`;

const styles = StyleSheet.create({
  centerView: {
    justifyContent: "center",
    padding: spacing[2],
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  leftCol: {
    padding: spacing[2],
    justifyContent: "center",
  },
  leftButton: {
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: "transparent",
    flex: 1,
    elevation: 0,
  },
  title: {
    ...ApplicationStyles.text.titleText,
  },
  icon: {
    alignSelf: "center",
  },
  modal: {
    padding: 20,
    paddingLeft: Metrics.sidesPadding,
    paddingRight: Metrics.sidesPadding,
  },
});

export default connect(
  null,
  { editTaskStatus },
  // @ts-ignore
)(HabitCard);
