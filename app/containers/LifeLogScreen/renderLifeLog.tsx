import AppDivider from "app/components/Divider";
import { RemainTasks, TaskRawModel } from "app/model";
import { LifeLogTaskInfoModel } from "app/model/LifeLogModel";
import metrics, { scaledSize } from "app/themes/Metrics";
import NavigateService from "app/tools/NavigateService";
import _ from "lodash";
import LottieView from "lottie-react-native";
import React, { Component } from "react";
import { Grid, Col } from "react-native-easy-grid";
import {
  Animated,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { ProgressCircle } from "react-native-svg-charts";
import moment from "moment";
import Modal from "react-native-modal";
import I18n from "localization";
import { connect } from "react-redux";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

import {
  AppBackground,
  Text,
  AppHeader,
  BorderCard,
  SizedBox,
  AppLoading,
  CalendarHabit,
  LineLog,
} from "components";
import { Colors, Images, strings, spacing } from "themes";
import {
  styles,
  CenterContentRow,
  StyledBorderCard,
  StyledRow,
} from "./renderLifeLog.presets";

const checkIcon = (
  <Ionicons
    name="md-checkmark"
    size={metrics.icon.normal}
    color={Colors.green}
  />
);
const starIcon = (
  <Entypo name="star" size={metrics.icon.normal} color={Colors.yellow} />
);
const trophyIcon = (
  <Entypo name="trophy" size={metrics.icon.normal} color={Colors.bloodOrange} />
);
const infoCircle = (
  <FontAwesome5
    name="info-circle"
    size={metrics.icon.normal}
    color={Colors.blue}
  />
);

export interface ILifeLogDetail {
  totalDone: number;
  someDoneDates: number;
  perfectDates: number;
  streaks: number;
}

interface IProps extends NavigationInjectedProps {
  lifeLog: ILifeLogDetail;
  fetching: boolean;
  handleRefresh: (...params: any) => void;
  minDate: string;
  tasks: TaskRawModel[];
  remainTasks: RemainTasks;
}

interface IState {
  isModalVisible: boolean;
  isRefresh: boolean;
  scrollViewPositionY: number;
  headerHeight: number;
  scrollY: any;
  readyToRefresh: boolean;
}

class RenderLifeLogScreen extends Component<IProps, IState> {
  static defaultProps = {
    lifeLog: {
      totalDone: 0,
      someDoneDates: 0,
      perfectDates: 0,
      streaks: 0,
    },
    fetching: true,
    handleRefresh: () => {},
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

  /***
   * events methods
   * */

  componentDidMount() {
    if (this.animation) {
      this.animation.play();
    }
    if (this.refLottieFunny) {
      this.refLottieFunny.play();
    }
  }

  onRefresh = date => {
    let month: any = new Date();
    if (date) {
      month = date;
    }

    month = moment(month).format(strings.format.month);

    this.props.handleRefresh(month);
  };

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  /***
   * render methods
   **/

  render() {
    const { lifeLog, fetching } = this.props;
    // tslint:disable-next-line: one-variable-per-declaration
    let someDoneDates = 0,
      perfectDates = 0;
    if (lifeLog) {
      someDoneDates = lifeLog.someDoneDates;
      perfectDates = lifeLog.perfectDates;
    }
    this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ["0deg", "360deg"],
    });

    const content = this.renderContent(someDoneDates, perfectDates);

    return (
      <AppBackground noImage>
        <AppHeader
          leftIcon={"back"}
          headerTx={strings.titleLifeLog}
          type={"transparent"}
          hasDivider
        />
        {fetching ? <AppLoading loadingSrc={Images.loadingPreloader} /> : null}
        <Modal isVisible={this.state.isModalVisible}>
          {this.renderModal()}
        </Modal>

        {content}
      </AppBackground>
    );
  }

  private renderModal = () => (
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
        <Text style={styles.subTitleText}>I'll try my best</Text>
      </TouchableOpacity>
    </View>
  );

  private renderContent(someDoneDates: number, perfectDates: number) {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={{ padding: spacing[5], backgroundColor: Colors.white }}
      >
        {this.renderTodayInfoRow()}

        <SizedBox height={4} />
        {this.renderDailyInfoRow()}

        <SizedBox height={4} />
        {this.renderThisWeekInfoRow()}

        <SizedBox height={6} />

        {this.renderThisMonthInfoRow()}

        <SizedBox height={6} />

        <CalendarHabit
          someDoneDates={someDoneDates}
          perfectDates={perfectDates}
          isLifeLog
          handleRefresh={this.onRefresh}
          minDate={this.props.minDate}
          isCalendarLife
          ref={ref => (this.calendarRef = ref)}
        />

        {this.renderDetailLifeLogStat()}

        {Platform.OS === "ios" ? <SizedBox height={5} /> : null}
      </ScrollView>
    );
  }

  private renderTodayInfoRow = () => {
    const { remainTasks } = this.props;
    return (
      <StyledRow>
        <SizedBox height={2} />
        <BorderCard>
          <Text
            text={`${remainTasks.today.done}/${remainTasks.today.total}`}
            preset={"bigContent"}
            style={{ paddingHorizontal: spacing[5] }}
          />
          <SizedBox height={2} />
          <Text
            tx={"lifeLog.today"}
            preset={"cardTitle"}
            style={{ paddingHorizontal: spacing[5] }}
          />
        </BorderCard>
        <View style={{ flex: 1 }}>
          <LottieView
            ref={c => (this.refLottieFunny = c)}
            loop
            source={Images.lifeLogFunny}
          />
        </View>
      </StyledRow>
    );
  };

  private renderDailyInfoRow = () => {
    const { remainTasks } = this.props;
    let data: LifeLogTaskInfoModel[] = [];
    if (remainTasks.daily) {
      // @ts-ignore
      data = _.map(remainTasks.daily.tasks, task => {
        return task;
      });
    }
    return this.renderInfoTasks("lifeLog.daily", data);
  };

  private renderThisWeekInfoRow = () => {
    const { remainTasks } = this.props;
    let data: LifeLogTaskInfoModel[] = [];
    if (remainTasks.weekly) {
      // @ts-ignore
      data = _.map(remainTasks.weekly.tasks, task => {
        return task;
      });
    }
    return this.renderInfoTasks("lifeLog.weekly", data);
  };

  private renderThisMonthInfoRow = () => {
    let data: LifeLogTaskInfoModel[] = [];
    const { remainTasks } = this.props;
    if (remainTasks.monthly) {
      // @ts-ignore
      data = _.map(remainTasks.monthly.tasks, task => {
        return task;
      });
    }
    return this.renderInfoTasks("lifeLog.monthly", data);
  };

  private renderInfoTasks = (title, listTasks: LifeLogTaskInfoModel[]) => {
    return (
      <StyledBorderCard>
        <Grid>
          <Col>
            <Text
              color={Colors.black}
              h6
              tx={title}
              style={{ padding: spacing[3] }}
            />
            <AppDivider />
            {this.renderFlatListInfoTask(title, listTasks)}
          </Col>
        </Grid>
      </StyledBorderCard>
    );
  };

  private renderFlatListInfoTask = (
    title,
    listTasks: LifeLogTaskInfoModel[]
  ) => {
    let text = I18n.t("lifeLog.thereAreNoTaskFor");
    text += " ";
    text += I18n.t(title).toLocaleLowerCase();

    if (listTasks.length <= 0) {
      return (
        <Text
          text={text}
          style={{ flex: 1, padding: spacing[4], textAlign: "center" }}
          preset="small"
        />
      );
    }
    return (
      <FlatList
        data={listTasks}
        renderItem={this.renderTaskInfoRow}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  private renderTaskInfoRow = ({ item }: { item: LifeLogTaskInfoModel }) => {
    const size = scaledSize(30);
    const percent = item.done / item.total;
    return (
      <CenterContentRow
        style={{ paddingVertical: spacing[3], paddingHorizontal: spacing[2] }}
        onPress={() =>
          NavigateService.navigate("detailTask", {
            item,
            transition: strings.transitionFromBottom,
          })
        }
      >
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
          <Text text={item.quest} />
        </Col>
        <SizedBox width={2} />
        <Col size={1}>
          <CenterContentRow>
            <Text
              text={`${item.done} / ${item.total}`}
              color={Colors.text.normal}
            />
            <Icon name="chevron-right" color={Colors.text.normal} />
          </CenterContentRow>
        </Col>
        <SizedBox width={2} />
      </CenterContentRow>
    );
  };

  private renderDetailLifeLogStat = () => {
    const { lifeLog } = this.props;
    // tslint:disable-next-line:one-variable-per-declaration
    let totalDone = 0,
      perfectDates = 0,
      streaks = 0;
    if (lifeLog) {
      totalDone = lifeLog.totalDone;
      perfectDates = lifeLog.perfectDates;
      streaks = lifeLog.streaks;
    }

    const currentStreak = this.getCurrentStreak(streaks);
    const bestStreak = this.getBestStreak(streaks);
    const totalPerfectDays = this.getTotalPerfectDays(perfectDates);

    return (
      <View style={{ flex: 1 }}>
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

  /***
   * private methods
   * */

  private getCurrentStreak = streaks => {
    if (streaks !== undefined && streaks.length > 0) {
      return streaks[streaks.length - 1];
    }
    return 0;
  };

  private getBestStreak = streaks => {
    if (streaks !== undefined && streaks.length > 0) {
      return Math.max(...streaks);
    }
    return 0;
  };

  private getTotalPerfectDays = perfectDates => {
    if (perfectDates !== undefined && perfectDates.length > 0) {
      return perfectDates.length;
    }
    return 0;
  };
}

const mapStateToProps = store => {
  if (store.tasks && store.tasks.data) {
    return {
      tasks: store.tasks.data,
      remainTasks: store.remainTasks,
    };
  }
  return {
    tasks: [],
    remainTasks: {
      today: {
        done: 0,
        total: 0,
      },
      daily: {
        tasks: [],
      },
      monthly: {
        tasks: [],
      },
      weekly: {
        tasks: [],
      },
    },
  };
};

export default connect(
  mapStateToProps,
  null
)(withNavigation(RenderLifeLogScreen));
