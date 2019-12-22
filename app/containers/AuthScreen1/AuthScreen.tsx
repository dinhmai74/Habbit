import { ApiFactory, getTokenString } from "app/api/firebase";
import { login } from "app/appRedux";
import { en } from "app/localization/languages/english";
import { Body, Row } from "native-base";
import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import { NavigationInjectedProps } from "react-navigation";
import styled from "styled-components";
import {
  AppButton,
  AppIcon,
  SizedBox,
  ToastService,
  withSpacing,
  AppBackground,
} from "components";
import { Metrics as metrics, strings } from "themes";
import { Colors as color, palette, screen } from "themes";
import NavigateService from "tools/NavigateService";

export interface IAuthScreenProps extends NavigationInjectedProps {}

interface State {
  user: any;
}

const StyledBody = styled(Body)``;

const StyledButton = styled(withSpacing(AppButton))`
  background: ${color.transparent};
  border-color: ${palette.white};
`;

export class AuthScreen extends Component<IAuthScreenProps, State> {
  unsubscriber: any;

  constructor(props: IAuthScreenProps) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const result = await firebase.auth().currentUser;
    if (result) {
      this.props.navigation.navigate(strings.routeMain);
    }
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      if (user) {
        user.getIdToken().then(token => {
          ApiFactory.getInstance().setHeader(
            "Authorization",
            getTokenString(token)
          );
        });
        AsyncStorage.setItem(strings.uid, user.uid);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if (this.state.user) {
      ToastService.showToast(
        "message.loginSuccess",
        "success",
        () => {
          NavigateService.navigate("main");
        },
        "bottom",
        1
      );
    }
    return (
      <AppBackground isLinear>
        <StyledBody>
          <SizedBox style={{ height: screen.height * 0.25 }} />
          <AppIcon icon="logoWithText" size={metrics.logo.normal} />
          <SizedBox height={5} />
          <Row>
            <StyledButton
              tx={"signIn"}
              margin={3}
              padding={3}
              type="outline"
              onPress={() => NavigateService.navigate("login")}
            />
            <StyledButton
              tx="signUp"
              margin={3}
              padding={3}
              type="outline"
              onPress={() => NavigateService.navigate("signUp")}
            />
          </Row>
        </StyledBody>
      </AppBackground>
    );
  }
}

export default AuthScreen;
