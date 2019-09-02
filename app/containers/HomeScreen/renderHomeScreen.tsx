/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// @flow
// import type { ViewLayoutEvent, } from 'react-native/Libraries/Components/View/ViewPropTypes';
import _ from "lodash";
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  UIManager,
  View,
} from "react-native";
import * as animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";

import { Button, ProgressBar, Spinner } from "native-base";
import {
  AppLoading,
  InlineDecorationText,
  AppBackground,
  AppHeader,
  SizedBox,
} from "../../components";
// eslint-disable-next-line import/no-extraneous-dependencies
import I18n from "../../localization";
import { Colors, Images, strings } from "../../themes";
import HabitCardStatic from "./components/HabitCard";
import styles, { Content } from "./styles";

import { FirebaseWorker } from "../../api/firebase";
// @ts-ignore
import DateSelection from "../../components/DateSelection";
import { capitalize, getPlatformElevation } from "../../tools";
import { formatDate, today } from "../../tools/DateHelper";

import { IDateItem } from ".";
import RenderWaitingScreen from "../../components/RenderWaitingScreen";
import { TaskFormattedModel } from "../../model";
import { spacing } from "../../themes/spacing";

// @ts-ignore
const HabitCard = animatable.createAnimatableComponent(HabitCardStatic);

const CustomLayoutAnimation = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

type Props = NavigationScreenProps & {
  rightIconOnClick: () => void;
  leftIconOnClick: () => void;
  addButtonOnPress: () => void;
  taskData: object[];
  error: boolean;
  updateTaskStatus: (
    tasksId: string,
    status: string,
    dateWatching: string
  ) => void;
  onChangeDate: (item: IDateItem) => void;
  watchingDate: string;
  refresh: () => void;
  onCardPress: (item: TaskFormattedModel) => void;
};

interface State {
  headerHeight: number;
  tipHeight: number;
  tipValue: string;
  isPullDownToAdd: boolean;
  isScrollDown: boolean;
  initLoading: boolean;
}

export interface ViewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewLayoutEvent {
  nativeEvent: {
    layout: ViewLayout;
  };
}

const SWIPE_THRESHOLD = 60;
const HEADER_HEIGHT_PERCENT = 2 / 3;

export default class HomeRender extends Component<Props, State> {
  static defaultProps = {
    onChangeDate: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isScrollDown: false,
      headerHeight: 0,
      tipHeight: 0,
      tipValue: I18n.t(strings.textPullToAdd),
      isPullDownToAdd: false,
      initLoading: true,
    };
  }

  /**
   * Life cycle
   */

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initLoading: false,
      });
    }, 2000);
  }

  componentWillUpdate() {
    // eslint-disable-next-line no-unused-expressions
    LayoutAnimation.configureNext(CustomLayoutAnimation);
  }

  /**
   * Handle events
   */

  onHeaderLayout = (event: ViewLayoutEvent) => {
    const { height } = event.nativeEvent.layout;
    this.setState({
      headerHeight: height,
    });
  };

  pullDown = () => {
    this.props.addButtonOnPress();
  };

  /**
   * private methods
   */

  onChangeDate = (item: IDateItem) => {
    this.props.onChangeDate(item);
  };

  updateTaskStatus = (
    tasksId: string,
    status: string,
    dateWatching: string
  ) => {
    this.props.updateTaskStatus(tasksId, status, dateWatching);
  };

  onCardPress = (item: TaskFormattedModel) => {
    if (this.props.onCardPress) {
      this.props.onCardPress(item);
    }
  };

  /**
   * Render
   */

  renderFlatListItem = ({
    item,
    index,
  }: {
    item: TaskFormattedModel;
    // eslint-disable-next-line react/no-unused-prop-types
    index: number;
  }) => {
    if (item.status) {
      return (
        // @ts-ignore
        <HabitCard
          title={item.quest}
          leftText={capitalize(I18n.t(strings.textDone))}
          rightText={capitalize(I18n.t(strings.textSkip))}
          leftButtonOnClick={() =>
            this.updateTaskStatus(item.id, "done", item.date)
          }
          rightButtonOnClick={() => {
            this.updateTaskStatus(item.id, "overdue", item.date);
          }}
          iconName={item.icon.name}
          status={item.status}
          color={item.icon.color}
          style={styles.card}
          navigation={this.props.navigation}
          cardInfo={item}
          // @ts-ignore
          archived={item.archived}
          statusTask={item.status}
          deleteTask={this.props.deleteTask}
          taskId={item.id}
          taskDate={item.date}
          updateTaskStatus={this.props.updateTaskStatus}
          onCardPress={this.onCardPress}
        />
      );
    }
    return null;
  };

  render() {
    const { error, taskData, watchingDate } = this.props;
    const { initLoading } = this.state;

    return (
      <AppBackground noImage bg={Colors.dimBg}>
        <AppHeader
          onLayout={this.onHeaderLayout}
          leftIcon={"history"}
          leftIconFontSize={25}
          onLeftPress={this.props.leftIconOnClick}
          headerTx={strings.titleHomeScreen}
          rightIcon={"setting"}
          onRightPress={this.props.rightIconOnClick}
          height={200}
          isLinear
        />
        {!error ? (
          initLoading ? (
            <AppLoading loadingSrc={Images.loadingHome} />
          ) : (
            <Content
              style={{
                padding: spacing[2],
              }}
            >
              <ScrollView>
                <FlatList
                  style={{ paddingBottom: 20 }}
                  // @ts-ignore
                  data={taskData}
                  renderItem={this.renderFlatListItem}
                  removeClippedSubviews={false}
                  extraData={taskData}
                  keyExtractor={(item, index) => index.toString()}
                />
                {taskData.length > 0 || initLoading ? null : (
                  <InlineDecorationText
                    // @ts-ignore
                    style={[
                      styles.inLineTip,
                      { marginTop: 200, width: "100%", flex: 1 },
                    ]}
                    text={capitalize(
                      watchingDate === today
                        ? I18n.t(strings.textPullToAdd)
                        : I18n.t(strings.textNothingHere)
                    )}
                  />
                )}
              </ScrollView>
              <SizedBox height={5} />
            </Content>
          )
        ) : (
          <View style={{ flex: 1, marginTop: "50%" }}>
            <InlineDecorationText
              // @ts-ignore
              style={[styles.inLineTip, { top: this.state.headerHeight }]}
              text={capitalize(I18n.t(strings.textPullToAdd))}
            />
          </View>
        )}

        {this.renderAddButton()}
        {this.renderDateSelectionFooter()}
      </AppBackground>
    );
  }

  renderDateSelectionFooter = (): React.ReactNode => {
    return (
      <DateSelection
        onDateChange={this.onChangeDate}
        style={styles.bottomDateSelection}
      />
    );
  };

  renderAddButton = () => (
    <Icon
      name="plus"
      type="entypo"
      color={Colors.green}
      reverse
      containerStyle={styles.button}
      onPress={this.props.addButtonOnPress}
    />
  );
}
