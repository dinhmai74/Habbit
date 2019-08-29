import _ from 'lodash'
import { View } from 'native-base'
import React, { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import moment from 'moment'
import { fetchLifeLog } from '../../actions'
import { AppLoading } from '../../components'
import RenderWaitingScreen from '../../components/RenderWaitingScreen'
import { currentMonth, formatDate } from '../../tools'
import RenderLifeLogScreen from './renderLifeLog'
import { Alert } from 'react-native'
import { Images } from '../../themes'
import colors from '../../themes/Colors'

interface IProps extends NavigationScreenProps {
  fetchLifeLog: typeof fetchLifeLog
  data: any
  fetching: boolean
  minDate: string
}

class LifeLogScreen extends Component<IProps> {
  static defaultProps = {
    navigation: null,
  }

  hadLoadingFirstTime: boolean = false

  componentDidMount() {
    this.handleRefresh(currentMonth)
  }

  handleRefresh = (month) => {
    this.props.fetchLifeLog(month)
  }

  renderFirstTimeLoading = () => {
    if (this.props.fetching && !this.hadLoadingFirstTime) {
      this.hadLoadingFirstTime = true
      return <AppLoading
        loadingSrc={Images.loadingPreloader}
        backgroundColor={colors.backdrop}
      />
    }
    return null

  }

  render() {
    const { data, fetching, minDate } = this.props
    return (
      <View style={{ flex: 1 }}>

        <RenderLifeLogScreen
          navigation={this.props.navigation}
          lifeLog={data}
          handleRefresh={this.handleRefresh}
          fetching={fetching}
          minDate={minDate}
        />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  const { lifeLog } = state
  const createdDates = _.map(state.tasks.data, (e) => {
    if (e) {
      return e.createdDate
    }
  })

  console.log(`%c state`, `color: blue; font-weight: 600`, state)

  const moments = createdDates.map((d) => moment(d))
  // @ts-ignore
  const minDate = formatDate(moment.min(moments))

  return {
    data: lifeLog.data,
    error: lifeLog.error,
    fetching: lifeLog.fetching,
    minDate,
  }
}

export default connect(
  mapStateToProps,
  { fetchLifeLog },
  // @ts-ignore
)(LifeLogScreen)
