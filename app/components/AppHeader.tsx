import { Text } from 'native-base'
import React, { Component } from 'react'
import { BackHandler, StyleProp, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../themes'
import { ImageButton } from './Button'

interface Props {
  title?: string
  leftIcon?: number
  leftTitle?: string
  leftTitleOnClick?: Function
  leftComponent?: JSX.Element
  color?: string

  rightTitle?: string
  rightTitleOnClick?: Function
  rightIcon?: string
  rightComponent?: JSX.Element
  navigation?: any
  style?: StyleSheet.NamedStyles<any>
  isLinear?: Boolean
}

class AppHeader extends Component<Props> {
  static defaultProps: any

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refresh) {
        this.props.navigation.state.params.refresh()
      }
    }
    this.props.navigation.goBack(null) // works best when the goBack is async
    return true
  }

  leftTitleOnClick = () => {
    const { leftTitleOnClick } = this.props
    if (leftTitleOnClick) { leftTitleOnClick() }
    else { this.handleBackPress() }
  }

  renderLeftOptions = () => {
    const { leftComponent, leftTitle, leftIcon, color } = this.props
    if (leftComponent) { return leftComponent }

    if (leftIcon) {
      return (
        // @ts-ignore
        <ImageButton
          tintColor={color}
          pressed={this.leftTitleOnClick}
          // @ts-ignore
          icon={leftIcon}
          size={22}
        />
      )
    }

    if (leftTitle) {
      return (
        <Text
          onPress={this.leftTitleOnClick}
          style={[
            styles.leftTitleText,
            styles.text,
            styles.subTitleText,
            { color },
          ]}
        >
          {leftTitle}
        </Text>
      )
    }

    return <View />
  }

  renderRightOptions = () => {
    const { rightComponent, rightTitle, rightIcon, color } = this.props
    if (rightComponent) { return rightComponent }

    if (rightIcon) {
      return (
        <ImageButton
          tintColor={color}
          // @ts-ignore
          pressed={this.props.rightTitleOnClick}
          // @ts-ignore
          icon={rightIcon}
          size={22}
        />
      )
    }

    if (rightTitle) {
      return (
        <Text
          // @ts-ignore
          onPress={this.props.rightTitleOnClick}
          // @ts-ignore
          style={[styles.rightTitleText, styles.text, styles.subTitleText]}
        >
          {rightTitle}
        </Text>
      )
    }

    return <View />
  }

  render() {
    const { title, style, isLinear, color } = this.props

    const colors = isLinear
      ? [Colors.linearStart, Colors.linearEnd]
      : ['transparent', 'transparent']

    return (
      <LinearGradient
        colors={colors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1.0 }}
        locations={[0, 0.8]}
        style={style}
      >
        <AppHeaderContainer {...this.props} style={this.props.style}>
          {this.renderLeftOptions()}
          {/* render center title */}
          <Text
            style={{
              ...ApplicationStyles.text.headerText,
              ...styles.title,
              ...styles.text,
              color,
            }}
          >
            {title}
          </Text>

          {this.renderRightOptions()}
        </AppHeaderContainer>
      </LinearGradient>
    )
  }
}

AppHeader.defaultProps = {
  title: '',
  color: Colors.white,
  leftIcon: null,
  leftTitle: null,
  leftTitleOnClick: null,
  leftComponent: null,
  rightTitle: null,
  rightIcon: null,
  rightTitleOnClick: Function,
  rightComponent: null,
  navigation: null,
  style: null,
  isLinear: false,
}

// @ts-ignore
export default withNavigation(AppHeader)

export const AppHeaderContainer = styled(View)`
  flexDirection:row
  width: 100%
  padding:${Metrics.statusBarHeight + Metrics.doubleBaseMargin}px ${
  Metrics.doubleBaseMargin
}px
  align-items: center
  justify-content: space-between
`

const styles = StyleSheet.create({
  text: {
    ...ApplicationStyles.text.headerText,
    color: Colors.textInBackground,
  },
  subTitleText: {
    textDecorationLine: 'underline',
    fontSize: Fonts.size.input,
  },
  leftTitleText: {
    alignSelf: 'flex-start',
  },
  rightTitle: {
    alignSelf: 'flex-end',
  },
  title: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  icon: {
    tintColor: Colors.white,
  },
})
