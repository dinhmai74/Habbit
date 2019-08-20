import React, { Component, } from "react"
import { Text, StyleSheet, ScrollView, View, } from "react-native"
import _ from "lodash"
import moment from "moment"
import { Calendar, } from "../react-native-calendars"
import { Colors, } from "../../themes"
import { currentMonth, getPlatformElevation, } from "../../tools"

export default class CalendarsHabit extends Component {
  state = {
    hideArrowLeft: false,
    hideArrowRight: true,
    watchingMonth: new Date().getMonth()
  }

  getWatchingMonth=()=>this.state.watchingMonth

  refreshData = date => {
    const { minDate, } = this.props
    const minMonth = moment(minDate).format("YYYY-MM")

    const month = date.month < 10 ? `0${date.month}` : date.month
    const watchingMonth = `${date.year}-${month}`
    this.setState({
      watchingMonth
    })

    // TODO: limit month
    // const hideArrowRight = moment(watchingMonth) > moment(currentMonth)
    // const hideArrowLeft = moment(watchingMonth) < moment("2018-12")

    // this.setState(
    //   {
    //     hideArrowLeft,
    //     hideArrowRight,
    //   },
    //   () => {
    //   }
    // )

    // console.tron.log("wachingMonth", watchingMonth)

    // console.tron.log("ref month", this.refCalendar.getWatchingMonth())
    this.props.handleRefresh(watchingMonth)
  }

  convertToMarkedDates = (Dates, stylesMarked) => {
    const markedDates = {}
    _.forEach(Dates, date => {
      markedDates[date] = stylesMarked
    })
    return markedDates
  }

  hideArrowRight = () => {
    // if (moment(watchingMonth) < moment(currentMonth)) return true
    return false
  }

  render() {
    const doneDates = {}
    _.forEach(this.props.doneDays, doneDay => {
      doneDates[doneDay.date] = stylesMarkedDate.perfect
    })

    const someDoneDates = this.convertToMarkedDates(
      this.props.someDoneDates,
      stylesMarkedDate.someDone
    )

    const perfectDates = this.convertToMarkedDates(
      this.props.perfectDates,
      stylesMarkedDate.perfect
    )

    const lifeLogDates = { ...someDoneDates, ...perfectDates, }

    return (
      <View style={styles.calendar}>
        <Calendar
          ref={c => {
            this.refCalendar = c
          }}
          onMonthChange={
            this.props.isCalendarLife ? date => this.refreshData(date) : null
          }
          markingType='custom'
          firstDay={1}
          markedDates={this.props.isLifeLog ? lifeLogDates : doneDates}
          theme={{
            arrowColor: Colors.headerBackground,
            todayTextColor: Colors.linearStart,
          }}
          // hideArrowLeft={this.state.hideArrowLeft}
          // hideArrowRight={this.state.hideArrowRight}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  calendar: {
    // borderTopWidth: 1,
    // paddingTop: 5,
    // borderBottomWidth: 1,
    // borderColor: "#eee",
    // height: 350,
    margin: 10,
    ...getPlatformElevation(),
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee",
  },
  container: {
    // flex: 1,
  },
})

const stylesMarkedDate = {
  someDone: {
    customStyles: {
      container: {
        backgroundColor: "transparent",
        elevation: 5,
        borderColor: Colors.linearEnd,
        borderWidth: 2,
      },
    },
  },
  perfect: {
    customStyles: {
      container: {
        backgroundColor: Colors.linearEnd,
      },
      text: {
        color: Colors.ricePaper,
      },
    },
  },
}
