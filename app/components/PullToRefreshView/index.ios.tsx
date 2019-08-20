import React, { Component } from 'react'
import {
  Animated,
  ScrollResponderEvent,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native'
import styles from './style'

import LottieView from 'lottie-react-native'

/**
 * @description custom pull to refresh animation ios version
 *
 * @example
 * <PullToRefreshView
 *  onRefresh={yourFunction}
 *
 *  onPullAnimationSrc="path/to/your/json"
 * >
 *  <View>
 *   // JSX.element here
 * </View>
 * </PullToRefreshView>
 */

interface IProps {
  /**
   * @property {propTypes.boolean} isRefreshing - condition display refreshing animation
   */
  isRefreshing: boolean
  /**
   * @property {propTypes.ViewStyle} style - custom container style
   */
  style: ViewStyle
  /**
   * @property {propTypes.number} pullHeight - max pull down height
   */
  pullHeight: number
  /**
   * @property {propTypes.onRefresh} function - refresh function
   */
  onRefresh: () => void
  /**
   * @property {propTypes.string} animationBackgroundColor - background color
   */
  animationBackgroundColor: string
  onScroll: ScrollResponderEvent
  /**
   * @property {propTypes.string} onPullAnimationSrc - path to pull anim source file(Json file )
   */
  onPullAnimationSrc: string
  /**
   * @property {propTypes.string} onStartRefreshAnimationSrc - path to start refresh anim source file (Json file)
   */
  onStartRefreshAnimationSrc: string
  /**
   * @property {propTypes.string} onRefreshAnimationSrc - path to refresh aim source file
   */
  onRefreshAnimationSrc: string
  /**
   * @property {propTypes.string}  onEndRefreshAnimationSrc- path to refresh aim source file
   */
  onEndRefreshAnimationSrc: string
  /**
   * @property {propTypes.JSX.Element} children- content
   */
  children: JSX.Element
  endAnimDuration: number
}

interface IState {
  readyToRefresh: boolean
  scrollY: any
  scrollViewPositionY: number
  isRefreshing: boolean
}

class PullToRefreshView extends Component<IProps, IState> {
  static defaultProps: any
  numRows: number
  ds: any
  refreshAnimRef: LottieView | null | undefined
  constructor(props) {
    super(props)
    this.numRows = 0
    this.state = {
      readyToRefresh: false,
      scrollY: new Animated.Value(0),
      scrollViewPositionY: 0,
      isRefreshing: false,
    }
  }

  componentDidMount() {
    this.state.scrollY.addListener((value) => this.handleScroll(value))
    this.setState({
      isRefreshing: this.props.isRefreshing,
    })
  }

  componentWillUnmount() {
    this.state.scrollY.removeAllListeners()
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { isRefreshing } = nextProps
    if (this.state.isRefreshing !== isRefreshing) {
      this.setState({
        isRefreshing: nextProps.isRefreshing,
      })

      if (!isRefreshing) {
        // @ts-ignore
        this.refs.PTRListView.scrollTo({ y: 0 })
      } else {
        // @ts-ignore
        this.refs.PTRListView.scrollTo({ y: -this.props.pullHeight + 10 })
      }
    }
  }

  handleRelease() {
    if (this.state.readyToRefresh) {
      this.props.onRefresh()
      this.setState({ isRefreshing: true })

      // this.refs.PTRListView.scrollTo({y: -130});
      // this.setState({ isRefreshing: true })
      // setTimeout(() => {
      //   this.refs.PTRListView.scrollTo({y: 0});
      //   this.setState({ isRefreshing: false })
      // }, 2000)
    }

    return this.setState({ readyToRefresh: false })
  }

  handleScroll = (pullDownDistance) => {
    if (this.state.isRefreshing) {
      if (this.refreshAnimRef) {
        this.refreshAnimRef.play()
      }
    }

    if (pullDownDistance.value <= -this.props.pullHeight) {
      return this.setState({ readyToRefresh: true })
    }
  }

  isScrolledToTop = () => {}

  onScrollViewLayout = (e) => {
    this.setState({
      scrollViewPositionY: e.nativeEvent.layout.y,
    })
  }

  render() {
    const progress = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
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

    const { scrollViewPositionY, isRefreshing } = this.state
    const {
      onPullAnimationSrc,
      onRefreshAnimationSrc,
      animationBackgroundColor,
    } = this.props

    return (
      <View style={[styles.scrollView, this.props.style]}>
        <View
          style={[
            styles.loadingContainer,
            {
              top: scrollViewPositionY,
            },
          ]}
        >
          {isRefreshing ? null : (
            <LottieView
              source={onPullAnimationSrc || onRefreshAnimationSrc}
              progress={progress}
              style={{
                flex: 1,
                backgroundColor: animationBackgroundColor,
              }}
            />
          )}
          {isRefreshing ? (
            <LottieView
              ref={(animation) => {
                this.refreshAnimRef = animation
              }}
              source={onRefreshAnimationSrc}
              style={{
                flex: 1,
              }}
            />
          ) : null}
        </View>

        <ScrollView
          onLayout={this.onScrollViewLayout}
          onScroll={event}
          scrollEventThrottle={16}
          onResponderRelease={this.handleRelease.bind(this)}
          onScrollEndDrag={() => {
            this.isScrolledToTop()
          }}
          style={{ flex: 1 }}
          ref='PTRListView'
        >
          <Animated.View>{this.props.children}</Animated.View>
        </ScrollView>
      </View>
    )
  }
}

PullToRefreshView.defaultProps = {
  pullHeight: 120,
  animationBackgroundColor: 'transparent',
  onRefresh: () => {},
  isRefreshing: false,
  endAnimDuration: 1000,
  onRefreshAnimationSrc: require('./loading-wave.json'),
  onStartRefreshAnimationSrc: require('./loading-wave.json'),
  onEndRefreshAnimationSrc: require('./loading-wave.json'),
  onPullAnimationSrc: null,
}

export default PullToRefreshView
