import * as React from 'react'
import { View, SafeAreaView } from 'react-native'
import { Icon as ElementIcon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { Button } from 'native-base'
import { SizedBox } from '../SizeBox'
import {
  NORMAL_ROOT_STYLE,
  NORMAL_TEXT,
  RIGHT,
  StyledBody,
  StyledBottomBg as StyledBgImg,
  StyledImage,
  StyledNotFloatingView,
  StyledRow,
  TRANSPARENT_ROOT_STYLE,
  TRANSPARENT_TEXT,
} from './AppHeader.preset'
import { IHeaderProps } from './AppHeader.props'
import AppI18n from '../../localization'
import { Colors, palette } from '../../themes'
import { Text } from '../Text'
import { Icon, IconTypes } from '../icon'
import styled from 'styled-components'

const StylesSafeArea = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingVertical: 5,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
class Header extends React.PureComponent<IHeaderProps, {}> {
  static defaultProps = {
    type: 'normal',
    onRightPress: () => {},
  }

  onLeftPress = () => {
    const { onLeftPress: onPress } = this.props
    onPress ? onPress() : this.props.navigation.goBack()
  }

  render() {
    const {
      headerText,
      headerTx,
      headerTextComponent,
      titleStyle,
      type,
      height,
      middleSubtitle,
      middleTitle,
    } = this.props
    const header = headerText || (headerTx && AppI18n.t(headerTx)) || ''
    let rootStyle = TRANSPARENT_ROOT_STYLE
    let titleTextStyle = TRANSPARENT_TEXT
    let notFloatingStyle = TRANSPARENT_ROOT_STYLE

    if (type === 'normal') {
      titleTextStyle = NORMAL_TEXT
      rootStyle = NORMAL_ROOT_STYLE
      notFloatingStyle = {
        ...NORMAL_ROOT_STYLE,
      }
    }

    const bgColors =
      type === 'normal'
        ? [Colors.header.bg.linear.start, Colors.header.bg.linear.end]
        : ['transparent', 'transparent']

    return (
      <View style={rootStyle}>
        {/* render center title */}
        <StyledNotFloatingView>
          {/* the close icon is under header row */}
          {this.renderCloseIcon()}

          {/* header row contains: left icon + title + right icon */}
          <StyledRow style={{ ...notFloatingStyle, ...this.props.style }}>
            {this.renderLeftIcon()}
            {headerTextComponent || (
              <Text
                style={{ ...titleTextStyle, ...titleStyle }}
                text={header}
              />
            )}
            {this.renderRightIcon()}
          </StyledRow>

          {/* subtitle is under header row (center by itself) */}
          <StyledBody>
            {middleSubtitle && <Text text={middleSubtitle} preset='subtitle' />}
            {middleTitle && <Text text={middleTitle} preset='header' />}
          </StyledBody>
        </StyledNotFloatingView>

        <StyledBgImg
          height={height}
          colors={bgColors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.8]}
        >
          <StyledImage icon='headerMap' height={height} />
        </StyledBgImg>
      </View>
    )
  }

  renderRightIcon = () => {
    const { rightIcon, onRightPress, type } = this.props
    if (!rightIcon) {
      return <View style={RIGHT} />
    }

    if (typeof rightIcon === 'string') {
      const iconColor =
        type === 'transparent' ? Colors.text.primary : palette.white

      return (
        <Button onPress={onRightPress} transparent>
          <Icon icon={rightIcon} style={{ tintColor: iconColor }} />
        </Button>
      )
    }

    return rightIcon
  }

  renderCloseIcon() {
    const { leftIcon, type } = this.props
    const iconColor: string =
      type === 'transparent' ? Colors.text.primary : palette.white
    if (leftIcon === 'close') {
      return (
        <ElementIcon
          name='close'
          type='material-community'
          size={30}
          color={iconColor}
          onPress={this.onLeftPress}
          containerStyle={{
            alignSelf: 'flex-start',
            margin: 0,
            padding: 0,
          }}
        />
      )
    }

    return null
  }

  renderLeftIcon = () => {
    const { leftIcon, type, leftIconFontFamily, leftIconFontSize } = this.props

    if (!leftIcon) {
      return null
    }
    const iconColor = type === 'transparent' ? palette.black : palette.white

    const size = leftIconFontSize || 16

    // render back icon
    if (leftIcon === 'back') {
      return this.renderLeftEIcon(
        'chevron-thin-left',
        'entypo',
        size,
        iconColor
      )
    }

    // not render close icon but still have space
    if (leftIcon === 'close') {
      return <SizedBox height={5} />
    }

    // render left icon base on font
    if (leftIconFontFamily) {
      return this.renderLeftEIcon(leftIcon, leftIconFontFamily, size, iconColor)
    }

    // render icon design by us
    if (typeof leftIcon === 'string') {
      return this.renderLeftLocalIcon(leftIcon, iconColor, size)
    }

    // return component if not a icon
    return leftIcon
  }

  private renderLeftLocalIcon(
    leftIcon: string,
    iconColor: string,
    size: number
  ) {
    return (
      <Button
        transparent
        onPress={this.onLeftPress}
        style={{
          alignItems: 'center',
        }}
      >
        <Icon icon={leftIcon as IconTypes} size={size} color={iconColor} />
      </Button>
    )
  }

  private renderLeftEIcon(
    leftIcon: string | JSX.Element,
    leftIconFontFamily: string,
    size: number,
    iconColor: string
  ) {
    return (
      <ElementIcon
        // @ts-ignore
        name={leftIcon}
        type={leftIconFontFamily}
        size={size}
        color={iconColor}
        onPress={this.onLeftPress}
        containerStyle={{ justifyContent: 'center', margin: 0, padding: 0 }}
      />
    )
  }
}

// @ts-ignore
export default withNavigation(Header)
