import React, { Component } from 'react'
import { BackHandler, ImageBackground, StyleSheet, View } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

import { H2, H3, Row, Text } from 'native-base'
import styled from 'styled-components'
import { Colors, Fonts, Metrics } from '../themes'
import { getPlatformElevation } from '../tools'
import { ImageButton } from './Button'

type Props = NavigationScreenProps & {
  title?: string
  leftIcon?: number
  leftTitle?: string
  leftTitleOnClick?: Function
  // eslint-disable-next-line no-undef
  leftComponent?: JSX.Element
  color?: string

  rightTitle?: string
  rightTitleOnClick?: Function
  rightIcon?: string
  // eslint-disable-next-line no-undef
  rightComponent?: JSX.Element
  style?: Object
  backgroundSrc: string,
}

class AppHeader extends Component<Props> {
  static defaultProps = {
    title: '',
    color: Colors.white,
    leftIcon: null,
    leftTitle: null,
    leftTitleOnClick: null,
    leftComponent: null,
    rightTitle: null,
    rightIcon: null,
    rightTitleOnClick: () => {},
    rightComponent: null,
    style: null,
  }

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
    if (leftTitleOnClick) {
      leftTitleOnClick()
    } else {
      this.handleBackPress()
    }
  }

  renderLeftOptions = () => {
    const { leftComponent, leftTitle, leftIcon, color } = this.props
    if (leftComponent) {
      return leftComponent
    }

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
    if (rightComponent) {
      return rightComponent
    }

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
    const { title, style, color, backgroundSrc, ...rest } = this.props
    return (
      <ImageBackground
        // @ts-ignore
        source={backgroundSrc}
        style={[styles.container, style]}
        {...rest}
      >
        <Overlay />
        <AppHeaderContainer {...this.props}>
          <Row>
            {this.renderLeftOptions()}

            {this.renderRightOptions()}
          </Row>

          {/* render center title */}
          <H3
            // @ts-ignore
            style={[styles.text, color && color]}
          >
            {title}
          </H3>
        </AppHeaderContainer>
      </ImageBackground>
    )
  }
}

// @ts-ignore
export default withNavigation(AppHeader)

const AppHeaderContainer = styled(View)`
  background-color: transparent;
  padding: ${Metrics.statusBarHeight + Metrics.doubleBaseMargin}px
    ${Metrics.doubleBaseMargin}px;
  flex: 1;
  justify-content: space-between;
  ${// @ts-ignore
  { ...StyleSheet.absoluteFill }};
`

const Overlay = styled(View)`
  background-color: rgba(172,172,172, 0.45);
  ${StyleSheet.absoluteFill };
`

const styles = StyleSheet.create({
  linear: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.4,
    // @ts-ignore
    ...getPlatformElevation(2),
    elevation: 2,
  },
  text: {
    color: Colors.white,
    padding: 10,
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
    paddingLeft: Metrics.sidesPadding,
    paddingRight: Metrics.sidesPadding,
  },

  icon: {
    tintColor: Colors.white,
  },
})
