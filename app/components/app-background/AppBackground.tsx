import flatten from "ramda/es/flatten";
import mergeAll from "ramda/es/mergeAll";
import React, { Component, ReactNode } from "react";
import {
  SafeAreaView,
  ViewStyle,
  StatusBar,
  Image,
  StatusBarStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Container, NativeBase, View } from "native-base";
import styled from "styled-components";
import { Colors, Images } from "app/themes";
import { screen } from "app/themes/Metrics";
import { withNavigation, NavigationInjectedProps } from "react-navigation";
import { RootRouteName } from "app/router/RootNavigator";
import contains from "ramda/es/contains";
import { icons, Icon } from "app/components/icon";

export const ABBackground = styled(Container)`
  background: ${Colors.background};
  width: 100%;
  height: 100;
`;

const StyledBottomImageWrapper = styled(View)`
  position: absolute;
  background: transparent;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${screen.width};
  z-index: -1;
  height: 150px;
`;

const StyledBottomImage = styled(Icon)`
  width: ${screen.width};
  z-index: -1;
  height: 150px;
`;

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export interface IAppBackground
  extends NativeBase.Container,
    NavigationInjectedProps {
  children: ReactNode;
  style?: ViewStyle;
  bg?: string;
  isLinear?: boolean;
  noImage?: boolean;
}

export class AppBackground extends Component<IAppBackground, {}> {
  static defaultProps = {
    bg: Colors.background,
  };

  render() {
    const { style: styleOverride, bg, ...rest } = this.props;
    const dfViewStyle = mergeAll(
      flatten([styleOverride, { backgroundColor: bg }])
    );

    // @ts-ignore
    const content = this.renderBg(dfViewStyle, rest);
    return content;
  }

  renderBg(dfViewStyle: ViewStyle, rest) {
    const { isLinear } = this.props;
    if (isLinear) {
      return this.renderLinearBg(dfViewStyle, rest);
    }

    return this.renderNormalBg(dfViewStyle, rest);
  }

  renderNormalBg(viewStyle: ViewStyle, rest): React.ReactNode {
    const { noImage, navigation } = this.props;
    const name = navigation.state.routeName;
    let bg = Colors.transparent;
    let statusBarStyle: StatusBarStyle = "dark-content";
    const gotBgHeader: RootRouteName[] = ["home"];
    if (contains(name, gotBgHeader)) {
      bg = Colors.header.bg.linear.start;
      statusBarStyle = "light-content";
    }

    return (
      <ABBackground style={viewStyle} {...rest}>
        <SafeAreaView style={{ flex: 0, backgroundColor: bg }} />
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={statusBarStyle} />
          {this.props.children}
          {!noImage && (
            <StyledBottomImageWrapper>
              <StyledBottomImage icon="bottomColoredImage" />
            </StyledBottomImageWrapper>
          )}
        </SafeAreaView>
      </ABBackground>
    );
  }

  renderLinearBg(styleOverride: ViewStyle, rest): React.ReactNode {
    const viewStyle = mergeAll(
      flatten([styleOverride, { backgroundColor: Colors.transparent }])
    );
    const { noImage } = this.props;

    return (
      <Container style={viewStyle} {...rest}>
        <LinearGradient
          colors={[Colors.linear.start, Colors.linear.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.0 }}
          locations={[0, 0.8]}
          style={{ flex: 1 }}
        >
          <StyledSafeAreaView>
            {this.props.children}
            {!noImage && (
              <StyledBottomImageWrapper>
                <StyledBottomImage icon="bottomImage" />
              </StyledBottomImageWrapper>
            )}
          </StyledSafeAreaView>
        </LinearGradient>
      </Container>
    );
  }
}

export default withNavigation(AppBackground);
