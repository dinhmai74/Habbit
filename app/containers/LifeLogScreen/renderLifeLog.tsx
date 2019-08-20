import LottieView from 'lottie-react-native'
import { Spinner, Text as NativebaseText } from 'native-base'
import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  RefreshControl,
  ScrollResponderEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import moment from 'moment'
import Modal from 'react-native-modal'
import { AppLoading } from '../../components'
import AppBackground from '../../components/AppBackground'
import AppHeader from '../../components/AppHeader'
import CalendarsHabit from '../../components/Calendar/CalendarHabit'
import LineLog from '../../components/LineLog/LineLog'
// @ts-ignore
import PullToRefreshListView from '../../components/PullToRefreshView'
import I18n from '../../localization'
import { Colors, Fonts, Images, Metrics, strings } from '../../themes'

const checkIcon = <FontAwesome5 name='check' size={30} color={Colors.green} />
const starIcon = <FontAwesome name='star' size={30} color={Colors.yellow} />
const trophyIcon = (
  <Ionicons name='md-trophy' size={30} color={Colors.bloodOrange} />
)
const thLarge = (
  <FontAwesome name='th-large' size={30} color={Colors.lightRed} />
)
const infoCircle = (
  <FontAwesome5 name='info-circle' size={30} color={Colors.blue} />
)

const MIN_PULLDOWN_DISTANCE = -140

export interface ILifeLogDetail {
  totalDone: number
  someDoneDates: number
  perfectDates: number
  streaks: number
}

interface IProps {
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
    handleRefresh: () => {},
  }

  state = {
    isModalVisible: false,
    isRefresh: false,
    scrollViewPositionY: 0,
    headerHeight: 0,
    scrollY: new Animated.Value(0),
    readyToRefresh: false,
  }

  animation: LottieView | null | undefined
  calendarRef: any

  componentDidMount() {
    if (this.animation) {
      this.animation.play()
    }
  }

  getCurrentStreak = (streaks) => {
    if (streaks !== undefined && streaks.length > 0) {
      return streaks[streaks.length - 1]
    }
    return 0
  }

  getBestStreak = (streaks) => {
    if (streaks !== undefined && streaks.length > 0) {
      return Math.max(...streaks)
    }
    return 0
  }

  getTotalPerfectDays = (perfectDates) => {
    if (perfectDates !== undefined && perfectDates.length > 0) {
      return perfectDates.length
    }
    return 0
  }

  onScrollViewLayout = (e) => {
    this.setState({
      scrollViewPositionY: e.nativeEvent.layout.y,
      headerHeight: e.nativeEvent.layout.height,
    })
  }

  onRefresh: () => void = () => {
    // alert('123')
    const date = moment()
    let month = Number(date.month) < 10 ? `0${date.month}` : date.month
    if (this.calendarRef) {
      month = this.calendarRef.getWatchingMonth()
    }
    this.props.handleRefresh(month)
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })

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
      <TouchableOpacity onPress={this._toggleModal}>
        <NativebaseText style={styles.subTitleText}>
          I'll try my best
        </NativebaseText>
      </TouchableOpacity>
    </View>
  )

  render() {
    const {
      totalDone,
      someDoneDates,
      perfectDates,
      streaks,
    } = this.props.lifeLog
    const { fetching } = this.props

    const { isRefresh, scrollViewPositionY } = this.state

    const currentStreak = this.getCurrentStreak(streaks)
    const bestStreak = this.getBestStreak(streaks)
    const totalPerfectDays = this.getTotalPerfectDays(perfectDates)

    const interpolatedRotateClockwise = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ['0deg', '360deg'],
    })

    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.scrollY,
          },
        },
      },
    ])

    return (
      <AppBackground>
        <AppHeader
          leftIcon={Images.iconLeftArrow}
          title={I18n.t(strings.titleLifeLog)}
          isLinear
        />
        <Modal isVisible={this.state.isModalVisible}>
          {this.renderModal()}
        </Modal>

        <PullToRefreshListView onRefresh={this.onRefresh} isRefreshing={fetching}>
            <CalendarsHabit
              someDoneDates={someDoneDates}
              perfectDates={perfectDates}
              isLifeLog
              handleRefresh={this.props.handleRefresh}
              minDate={this.props.minDate}
              isCalendarLife
              ref={(ref) => (this.calendarRef = ref)}
            />
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
                icon={checkIcon}
                content={I18n.t(strings.totalHabitDone)}
                value={totalDone}
              />
              <TouchableOpacity onPress={this._toggleModal}>
                <LineLog
                  icon={infoCircle}
                  content={I18n.t(strings.howLifeLogWorks)}
                />
              </TouchableOpacity>
            </View>
        </PullToRefreshListView>
      </AppBackground>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 60,
  },
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
  },
  subTitleText: {
    textDecorationLine: 'underline',
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
    textAlign: 'center',
    paddingBottom: 20,
  },
})
