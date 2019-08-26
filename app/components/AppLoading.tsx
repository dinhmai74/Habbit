import LottieView from 'lottie-react-native'
import React, { Component } from 'react'
import { RefreshControl, ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { View } from 'react-native-animatable'
import { Colors, Images } from '../themes'
import colors from '../themes/Colors'

interface IProps {
  handleRefresh: () => void
  fetching: boolean
  loadingSrc: string
  style: any
  backgroundColor?: string
}

export default class AppLoading extends Component<IProps> {
  static defaultProps = {
    loadingSrc: Images.loadingWithWave,
    fetching: true,
    handleRefresh: () => {},
    style: null,
  }
  animation: LottieView | null | undefined
  componentDidMount() {
    if (this.animation) {
      this.animation.play()
    }
  }

  render() {
    const { loadingSrc, style, backgroundColor: bg } = this.props
    const backgroundColor = bg && { backgroundColor: bg }
    return (
      <View style={[styles.container, style, backgroundColor]}>
        <LottieView
          ref={(animation) => {
            this.animation = animation
          }}
          source={loadingSrc}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99999,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  refreshControl: {},
})
