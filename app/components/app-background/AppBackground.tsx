import flatten from 'ramda/es/flatten'
import mergeAll from 'ramda/es/mergeAll'
import React, { Component, ReactNode } from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Container, NativeBase, View } from 'native-base'
import styled from 'styled-components'
import { Colors } from '../../themes';
import { screen } from '../../themes/Metrics';
import { Icon } from '../../components';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

export const ABBackground = styled(Container)`
  background: ${Colors.background};
  width: 100%;
  height: 100;
`

const StyledBottomImageWrapper = styled(View)`
  position: absolute;
  background: transparent;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${screen.width};
  z-index: -1;
  height: 150px;
`

const StyledBottomImage = styled(Icon)`
  width: ${screen.width};
  z-index: -1;
  height: 150px;
`

export interface IAppBackground extends NativeBase.Container, NavigationInjectedProps {
  children: ReactNode
  style?: ViewStyle
  bg?: string
  isLinear?: boolean
  noImage?: boolean
}

export class AppBackground extends Component<IAppBackground, {}> {
  static defaultProps = {
    bg: Colors.background,
  }

  render() {
    const { style: styleOverride, bg, ...rest } = this.props
    const dfViewStyle = mergeAll(
      flatten([styleOverride, { backgroundColor: bg }]),
    )

    // @ts-ignore
    const content = this.renderBg(dfViewStyle, rest)
    return content
  }

  renderBg(dfViewStyle: ViewStyle, rest) {
    const { isLinear } = this.props
    if (isLinear) {
      return this.renderLinearBg(dfViewStyle, rest)
    }

    return this.renderNormalBg(dfViewStyle, rest)
  }

  renderNormalBg(viewStyle: ViewStyle, rest): React.ReactNode {
    const { noImage } = this.props
    return (
      <ABBackground style={viewStyle} {...rest}>
        {this.props.children}
        {!noImage && (
          <StyledBottomImageWrapper>
            <StyledBottomImage icon='bottomColoredImage' />
          </StyledBottomImageWrapper>
        )}
      </ABBackground>
    )
  }

  renderLinearBg(styleOverride: ViewStyle, rest): React.ReactNode {
    const viewStyle = mergeAll(
      flatten([styleOverride, { backgroundColor: Colors.transparent }]),
    )
    const { noImage } = this.props

    return (
      <Container style={viewStyle} {...rest}>
        <LinearGradient
          colors={[Colors.linear.start, Colors.linear.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.0 }}
          locations={[0, 0.8]}
          style={{ flex: 1 }}
        >
          {this.props.children}
          {!noImage && (
            <StyledBottomImageWrapper>
              <StyledBottomImage icon='bottomImage' />
            </StyledBottomImageWrapper>
          )}
        </LinearGradient>
      </Container>
    )
  }
}

export default withNavigation(AppBackground)
