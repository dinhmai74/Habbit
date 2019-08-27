import React from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  ScrollResponderEvent,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native'

import Animation from 'lottie-react-native'

/**
 * @description custom pull to refresh animation android version
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
  scrollY: any
  refreshHeight: any
  currentY: number
  isScrollFree: boolean

  isRefreshAnimationStarted: boolean
  isRefreshAnimationEnded: boolean
  initAnimationProgress: any
  repeatAnimationProgress: any
  finalAnimationProgress: any
  [another: string]: any
}

class PullToRefreshView extends React.Component<IProps, IState> {
  static defaultProps: any
  _panResponder: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      refreshHeight: new Animated.Value(0),
      currentY: 0,
      isScrollFree: true,

      isRefreshAnimationStarted: false,
      isRefreshAnimationEnded: false,
      initAnimationProgress: new Animated.Value(0),
      repeatAnimationProgress: new Animated.Value(0),
      finalAnimationProgress: new Animated.Value(0),
    }

    this.onRepeatAnimation = this.onRepeatAnimation.bind(this)
    this.onEndAnimation = this.onEndAnimation.bind(this)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(
        this,
      ),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(
        this,
      ),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    })
  }

  componentWillReceiveProps(props) {
    if (this.props.isRefreshing !== props.isRefreshing) {
      // Finish the animation and set refresh panel height to 0
      if (!props.isRefreshing) {
      }
    }
  }

  _handleStartShouldSetPanResponder() {
    return !this.state.isScrollFree
  }

  _handleMoveShouldSetPanResponder() {
    return !this.state.isScrollFree
  }

  // if the content scroll value is at 0, we allow for a pull to refresh
  _handlePanResponderMove(gestureState) {
    this.setState({
      isScrolling: true,
    })
    if (!this.props.isRefreshing) {
      if (
        (gestureState.dy >= 0 && this.state.scrollY._value === 0) ||
        this.state.refreshHeight._value > 0
      ) {
        this.state.refreshHeight.setValue(-1 * gestureState.dy * 0.5)
      } else {
        // Native android scrolling
        // @ts-ignore
        this.refs.scrollComponentRef.scrollTo({
          y: -1 * gestureState.dy,
          animated: true,
        })
      }
    }
  }

  _handlePanResponderEnd() {
    this.setState({
      isScrolling: false,
    })
    if (!this.props.isRefreshing) {
      if (this.state.refreshHeight._value <= -this.props.pullHeight) {
        this.onScrollRelease()
        Animated.parallel([
          Animated.timing(this.state.refreshHeight, {
            toValue: -this.props.pullHeight,
          }),
          Animated.timing(this.state.initAnimationProgress, {
            toValue: 1,
          }),
        ]).start(() => {
          this.state.initAnimationProgress.setValue(0)
          this.setState({ isRefreshAnimationStarted: true })
          this.onRepeatAnimation()
        })
      } else if (this.state.refreshHeight._value <= 0) {
        Animated.timing(this.state.refreshHeight, {
          toValue: 0,
        }).start()
      }

      if (this.state.scrollY._value > 0) {
        this.setState({ isScrollFree: true })
      }
    }
  }

  onRepeatAnimation() {
    this.state.repeatAnimationProgress.setValue(0)

    Animated.timing(this.state.repeatAnimationProgress, {
      toValue: 1,
      duration: this.props.endAnimDuration,
    }).start(() => {
      if (this.props.isRefreshing) {
        this.onRepeatAnimation()
      } else {
        this.state.repeatAnimationProgress.setValue(0)
        this.onEndAnimation()
      }
    })
  }

  onEndAnimation() {
    this.setState({ isRefreshAnimationEnded: true })
    Animated.sequence([
      Animated.timing(this.state.finalAnimationProgress, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.spring(this.state.refreshHeight, {
        toValue: 0,
        bounciness: 12,
      }),
    ]).start(() => {
      this.state.finalAnimationProgress.setValue(0)
      this.setState({
        isRefreshAnimationEnded: false,
        isRefreshAnimationStarted: false,
      })
    })
  }

  onScrollRelease() {
    if (!this.props.isRefreshing) {
      this.props.onRefresh()
    }
  }

  isScrolledToTop() {
    if (this.state.scrollY._value === 0 && this.state.isScrollFree) {
      this.setState({ isScrollFree: false })
    }
  }

  renderPullAnimation = (animationStyle, animateProgress) => {
    const { onPullAnimationSrc } = this.props

    const { isScrolling } = this.state

    if (!isScrolling) {
      return null
    }

    return (
      <Animation
        // @ts-ignore
        style={[animationStyle, { opacity: this.props.isRefreshing ? 0 : 1 }]}
        source={onPullAnimationSrc}
        progress={animateProgress}
      />
    )
  }

  render() {
    const onScrollEvent = (event) => {
      this.state.scrollY.setValue(event.nativeEvent.contentOffset.y)
    }

    const animateHeight = this.state.refreshHeight.interpolate({
      inputRange: [-this.props.pullHeight, 0],
      outputRange: [this.props.pullHeight, 0],
    })

    console.log(
      `%c animateHeight`,
      `color: blue; font-weight: 600`,
      animateHeight,
    )

    const animationStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: this.props.animationBackgroundColor,
      width: Dimensions.get('window').width,
      height: this.props.pullHeight,
    }

    const {
      onStartRefreshAnimationSrc,
      onEndRefreshAnimationSrc,
      onRefreshAnimationSrc,
      style,
    } = this.props

    return (
      <View
        style={{
          flex: 1,
          ...style,
        }}
        {...this._panResponder.panHandlers}
      >
        <View
          style={{
            backgroundColor: this.props.animationBackgroundColor,
          }}
        >
          {/* {this.renderPullAnimation(animationStyle, animateProgress)} */}

          <Animation
            // @ts-ignore
            style={[
              animationStyle,
              {
                opacity:
                  this.props.isRefreshing &&
                  !this.state.isRefreshAnimationStarted
                    ? 1
                    : 0,
              },
            ]}
            source={onStartRefreshAnimationSrc || onRefreshAnimationSrc}
            progress={this.state.initAnimationProgress}
          />
          <Animation
            // @ts-ignore
            style={[
              animationStyle,
              {
                opacity:
                  this.state.isRefreshAnimationStarted &&
                  !this.state.isRefreshAnimationEnded
                    ? 1
                    : 0,
              },
            ]}
            source={onRefreshAnimationSrc }
            progress={this.state.repeatAnimationProgress}
          />
          <Animation
            // @ts-ignore
            style={[
              animationStyle,
              { opacity: this.state.isRefreshAnimationEnded ? 1 : 0 },
            ]}
            source={onEndRefreshAnimationSrc || onEndRefreshAnimationSrc}
            progress={this.state.finalAnimationProgress}
          />
        </View>

        <ScrollView
          ref='scrollComponentRef'
          scrollEnabled={this.state.isScrollFree}
          showsVerticalScrollIndicator={false}
          onScroll={onScrollEvent}
          onTouchEnd={() => {
            this.isScrolledToTop()
          }}
          onScrollEndDrag={() => {
            this.isScrolledToTop()
          }}
        >
          <Animated.View style={{ marginTop: animateHeight }}>
            {this.props.children}
          </Animated.View>
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
