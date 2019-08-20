import LottieView from 'lottie-react-native'
import React, { Component } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { Colors, Images } from '../themes'
import { AppBackground } from './app-background';

interface IProps {
  handleRefresh: () => void
  fetching: boolean
  color?: string
}

export default class RenderWaitingScreen extends Component<IProps> {
  static defaultProps = {
    color: Colors.white,
  }

  animation: LottieView | null | undefined

  componentDidMount() {
    if (this.animation) { this.animation.play() }
  }

  renderRefreshControl = () => (
    <RefreshControl
      style={styles.refreshControl}
      refreshing={this.props.fetching}
      onRefresh={this.props.handleRefresh}
      tintColor={this.props.color}
    />
  )

  render() {
    return (
      <AppBackground isLinear>
        <LottieView
          ref={(animation) => {
            this.animation = animation
          }}
          source={Images.loading}
        />
      </AppBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '50%',
  },
  refreshControl: {},
})
