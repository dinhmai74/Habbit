import AppDivider from "app/components/Divider";
import { LifeLogTaskInfoModel } from "app/model/LifeLogModel";
import colors from "app/themes/Colors";
import metrics, { scaledSize } from "app/themes/Metrics";
import LottieView from "lottie-react-native";
import { CardItem, Content, Body, Left, Right } from "native-base";
import React, { Component } from "react";
import { Row, Grid, Col } from "react-native-easy-grid";
import { Animated, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { ProgressCircle } from "react-native-svg-charts";
import moment from "moment";
import Modal from "react-native-modal";
import {
  AppBackground,
  Text,
  AppHeader,
  BorderCard,
  SizedBox, AppLoading,
} from "components";
import CalendarsHabit from "app/components/Calendar/CalendarHabit";
import LineLog from "app/components/LineLog/LineLog";
// @ts-ignore
import PullToRefresh from "app/components/PullToRefreshView";
import I18n from "localization";
import { Colors, Fonts, Images, Metrics, strings, spacing } from "themes";
import styled from "styled-components";
import { NavigationInjectedProps } from "react-navigation";
// import PullToRefresh from "react-native-pull-refresh";

const checkIcon = <Ionicons name="md-checkmark" size={metrics.icon.normal} color={Colors.green} />;
const starIcon = <Entypo name="star" size={metrics.icon.normal} color={Colors.yellow} />;
const trophyIcon = (
  <Entypo name="trophy" size={metrics.icon.normal} color={Colors.bloodOrange} />
);
const infoCircle = (
  <FontAwesome5 name="info-circle" size={metrics.icon.normal} color={Colors.blue} />
);

export interface ILifeLogDetail {
  totalDone: number
  someDoneDates: number
  perfectDates: number
  streaks: number
}

interface IProps extends NavigationInjectedProps {
  lifeLog: ILifeLogDetail
  fetching: boolean
  handleRefresh: (...params: any) => void
  minDate: string
}

interface IState {
  isModalVisible: boolean
  isRefresh: boolean
  scrollViewPositionY: number
  headerHeight: number
  scrollY: any
  readyToRefresh: boolean
}

export default class RenderLifeLogScreen extends Component<IProps, IState> {
  static defaultProps = {
    lifeLog: {
      totalDone: 0,
      someDoneDates: 0,
      perfectDates: 0,
      streaks: 0,
    },
    fetching: true,
    handleRefresh: () => {
    },
  };

  state = {
    isModalVisible: false,
    isRefresh: false,
    scrollViewPositionY: 0,
    headerHeight: 0,
    scrollY: new Animated.Value(0),
    readyToRefresh: false,
  };

  animation: LottieView | null | undefined;
  calendarRef: any;
  refLottieFunny: LottieView | null | undefined;

  componentDidMount() {
    if (this.animation) {
      this.animation.play();
    }
    if (this.refLottieFunny) {
      this.refLottieFunny.play();
    }
  }

  getCurrentStreak = (streaks) => {
    if (streaks !== undefined && streaks.length > 0) {
      return streaks[streaks.length - 1];
    }
    return 0;
  };

  getBestStreak = (streaks) => {
    if (streaks !== undefined && streaks.length > 0) {
      return Math.max(...streaks);
    }
    return 0;
  };

  getTotalPerfectDays = (perfectDates) => {
    if (perfectDates !== undefined && perfectDates.length > 0) {
      return perfectDates.length;
    }
    return 0;
  };

  onScrollViewLayout = (e) => {
    this.setState({
      scrollViewPositionY: e.nativeEvent.layout.y,
      headerHeight: e.nativeEvent.layout.height,
    });
  };

  onRefresh = (date) => {
    let month: any = new Date();
    if (date) {
      month = date;
    }

    month = moment(month).format(strings.format.month);

    this.props.handleRefresh(month);
  };

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderModal = () => (
    <View style={styles.modalContent}>
      <Text style={styles.title}>How life log works</Text>
      <Text style={styles.text}>
        Life log shows how you have going across all of your habits.
      </Text>
      <Text style={styles.text}>
        Do all habits for a day to get a solid calendar dot.
      </Text>
      <Text style={styles.text}>
        Aim for as many of these perfect days as you can.
      </Text>
      <TouchableOpacity onPress={this.toggleModal}>
        <Text style={styles.subTitleText}>
          I'll try my best
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { fetching, lifeLog } = this.props;
    // tslint:disable-next-line: one-variable-per-declaration
    let totalDone = 0,
      someDoneDates = 0,
      perfectDates = 0,
      streaks = 0;
    if (lifeLog) {
      totalDone = lifeLog.totalDone;
      someDoneDates = lifeLog.someDoneDates;
      perfectDates = lifeLog.perfectDates;
      streaks = lifeLog.streaks;
    }

    const { isRefresh, scrollViewPositionY } = this.state;

    const interpolatedRotateClockwise = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ["0deg", "360deg"],
    });

    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.scrollY,
          },
        },
      },
    ]);

    const content = this.renderContent(someDoneDates, perfectDates);

    return (
      <AppBackground noImage>
        <AppHeader
          leftIcon={"back"}
          headerTx={strings.titleLifeLog}
          type={"transparent"}
          hasDivider
        />
        <Modal isVisible={this.state.isModalVisible}>
          {this.renderModal()}
        </Modal>
        <View style={{ flex: 1 }}>

          <PullToRefresh
            isRefreshing={this.state.isRefresh}
            onRefresh={this.onRefresh}
            animationBackgroundColor={Colors.secondary}
            pullHeight={180}
            contentView={
              content
            }

            onPullAnimationSrc={Images.umbrella_pull}
            onStartRefreshAnimationSrc={Images.umbrella_start}
            onRefreshAnimationSrc={Images.umbrella_repeat}
            onEndRefreshAnimationSrc={Images.umbrella_end}
          />
        </View>

      </AppBackground>
    );
  }

  private renderContent(someDoneDates: number, perfectDates: number) {
    const { fetching } = this.props;
    return (
      <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}
                  style={{ padding: spacing[5], backgroundColor: Colors.white }}>
        {this.renderTodayInfoRow()}

        <SizedBox height={4} />

        {
          fetching ? <AppLoading
            loadingSrc={Images.loadingPreloader}
          /> : null
        }

        <SizedBox height={4} />
        {this.renderThisWeekInfoRow()}

        <SizedBox height={6} />

        {this.renderThisMonthInfoRow()}

        <SizedBox height={6} />

        <CalendarsHabit
          someDoneDates={someDoneDates}
          perfectDates={perfectDates}
          isLifeLog
          handleRefresh={this.onRefresh}
          minDate={this.props.minDate}
          isCalendarLife
          ref={(ref) => (this.calendarRef = ref)}
        />

        {this.renderDetailLifeLogStat()}
      </ScrollView>);
  }

  private renderTodayInfoRow = () =>
    (<StyledRow>
      {/*<BorderCard style={{ alignItems: 'center', flex: 1 }}>*/}
      {/*  <Text tx={'lifeLog.currentStreaks'} preset={'cardTitle'}/>*/}
      {/*  <SizedBox height={2}/>*/}
      {/*  <Text text={'3'} preset={'bigContent'}/>*/}
      {/*</BorderCard>*/}

      {/*<SizedBox width={4}/>*/}
      {/*<BorderCard style={{ alignItems: 'center', flex: 1 }}>*/}
      {/*  <Text text={'3/7'} preset={'bigContent'}/>*/}
      {/*  <SizedBox height={2}/>*/}
      {/*  <Text tx={'lifeLog.inThisWeeks'} preset={'cardTitle'}/>*/}
      {/*</BorderCard>*/}

      <SizedBox height={2} />
      <BorderCard>
        <Text text={"0/4"} preset={"bigContent"} style={{ paddingHorizontal: spacing[5] }} />
        <SizedBox height={2} />
        <Text tx={"lifeLog.today"} preset={"cardTitle"} style={{ paddingHorizontal: spacing[5] }} />
      </BorderCard>
      <View style={{ flex: 1 }}>
        <LottieView ref={(c) => this.refLottieFunny = c} loop source={Images.lifeLogFunny} />

      </View>
    </StyledRow>);

  private renderThisWeekInfoRow = () => {

    const data: LifeLogTaskInfoModel[] = [{ total: 7, done: 1, title: "Cook some thing" }, {
      title: "play game",
      total: 5,
      done: 3,
    }];
    return this.renderInfoTasks("lifeLog.thisWeek", data);
  };

  private renderThisMonthInfoRow = () => {
    const data: LifeLogTaskInfoModel[] = [{ total: 7, done: 6, title: "Cook some thing" }];
    return this.renderInfoTasks("lifeLog.thisWeek", data);
  };

  private renderInfoTasks = (title, listTasks: LifeLogTaskInfoModel[]) => {
    return (
      <StyledBorderCard>
        <Grid>
          <Col>
            <Text color={Colors.black} h6 tx={"lifeLog.thisWeek"} style={{ padding: spacing[3] }} />
            <AppDivider />
            <FlatList data={listTasks} renderItem={this.renderTaskInfoRow}
                      keyExtractor={(item, index) => index.toString()} />
          </Col>
        </Grid>
      </StyledBorderCard>
    );
  };

  private renderTaskInfoRow = ({ item }: { item: LifeLogTaskInfoModel }) => {
    const size = scaledSize(30);
    const percent = (item.done / item.total);
    return <CenterContentRow style={{ paddingVertical: spacing[3], paddingHorizontal: spacing[2] }}>
      <SizedBox width={3} />
      <Col size={1}>
        <ProgressCircle
          style={{ height: size, width: size }}
          progress={percent}
          strokeWidth={2}
          progressColor={"rgb(134, 65, 244)"}
        />
      </Col>

      <Col size={3}>
        <Text text={item.title} />
      </Col>
      <SizedBox width={2} />
      <Col size={1}>
        <CenterContentRow>
          <Text text={`${item.done} / ${item.total}`} color={Colors.text.normal} />
          <Icon name="chevron-right" color={Colors.text.normal} />
        </CenterContentRow>
      </Col>
      <SizedBox width={2} />
    </CenterContentRow>;
  };

  private renderDetailLifeLogStat = () => {
    const { lifeLog } = this.props;
    // tslint:disable-next-line:one-variable-per-declaration
    let totalDone = 0,
      someDoneDates = 0,
      perfectDates = 0,
      streaks = 0;
    if (lifeLog) {
      totalDone = lifeLog.totalDone;
      someDoneDates = lifeLog.someDoneDates;
      perfectDates = lifeLog.perfectDates;
      streaks = lifeLog.streaks;
    }

    const currentStreak = this.getCurrentStreak(streaks);
    const bestStreak = this.getBestStreak(streaks);
    const totalPerfectDays = this.getTotalPerfectDays(perfectDates);

    return (<View style={{ flex: 1 }}>
        <LineLog
          icon={checkIcon}
          content={I18n.t(strings.totalPerfectDays)}
          value={totalPerfectDays}
        />
        <LineLog
          icon={starIcon}
          content={I18n.t(strings.yourCurrentSteak)}
          value={currentStreak}
        />
        <LineLog
          icon={trophyIcon}
          content={I18n.t(strings.yourBestSteak)}
          value={bestStreak}
        />
        <LineLog
          icon={infoCircle}
          content={I18n.t(strings.totalHabitDone)}
          value={totalDone}
        />
      </View>
    );
  };

}

const StyledRow = styled(Row)`
  flex-direction: row;
  padding: ${spacing[2]}px ${spacing[0]}px;
  background: ${Colors.white};
`;

const StyledBorderCard = styled(BorderCard)`
   padding: ${spacing[0]}px ${spacing[0]}px ;
`;

const CenterContentRow = styled(Row)`
  align-items: center;
`;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: "100%",
    height: 60,
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
  },
  title: {
    color: Colors.facebook,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    textAlign: "center",
    paddingBottom: 20,
  },
});
