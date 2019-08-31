/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Text, Toast, View } from "native-base";
import { NavigationScreenProps } from "react-navigation";

import { login, googleLogin, facebookLogin } from "actions";
import { ToastService } from "../../components";
import I18n from "../../localization";
import { strings } from "../../themes";
import RenderLoginScreen from "./RenderLoginScreen";

// valid email and password
// {
//   email: "test@gmail.com",
//   password: "abcxyc",
// }

interface IProps {
  login: Function;
  fetching: boolean;
  fetchingGoogle: boolean;
  fetchingFacebook: boolean;
  googleLogin: Function;
  facebookLogin: Function;
}

class LoginScreen extends Component<IProps & NavigationScreenProps> {
  state = {
    error: false,
  };

  handlePressSignIn = (userInfo: any) => {
    if (this.isSignIn()) {
      return;
    }
    const isValidInfo = this.validate(userInfo);
    this.setState({
      error: !isValidInfo,
    });
    if (isValidInfo) {
      this.props.login(
        userInfo,
        () => {
          this.props.navigation.navigate(strings.routeMain);
        },
        () => {
          this.setState({
            error: true,
          });
          ToastService.showToast(
            I18n.t(strings.errMessYourLoginDetailsWereIncorrect)
          );
        }
      );
    }
  };

  validate = (userInfo: any) => {
    const { email, password } = userInfo;
    const isValidEmail = this.validateEmail(email);
    if (!isValidEmail.flag) {
      // @ts-ignore
      ToastService.showToast(isValidEmail.message);
      return false;
    }

    const isValidPassword = this.validatePassword(password);

    if (!isValidPassword) {
      // @ts-ignore
      ToastService.showToast(isValidPassword.message);
      return false;
    }

    return true;
  };

  validatePassword = (password: string) => {
    if (!password) {
      return {
        flag: false,
        message: I18n.t(strings.errMessYourPasswordIsEmpty),
      };
    }

    return { flag: true };
  };

  validateEmail = (email: string) => {
    if (!email) {
      return {
        flag: false,
        message: I18n.t(strings.errMessYourEmailIsEmpty),
      };
    }

    return { flag: true };
  };

  handlePressSignUp = () => {
    this.props.navigation.navigate(strings.routeSignUp);
  };

  onMainAuthScreen = () => {
    this.props.navigation.navigate(strings.routeMainAuth);
  };

  handlePressGoogleSignIn = () => {
    if (this.isSignIn()) {
      return;
    }
    const { googleLogin } = this.props;
    googleLogin(
      status => {
        console.log("handlePressGoogleSignIn: ", JSON.stringify(status));
        this.props.navigation.navigate(strings.routeMain);
      },
      error => {
        error.message && ToastService.showToast(error.message);
      }
    );
  };

  handlePressFacebookSignIn = () => {
    if (this.isSignIn()) {
      return;
    }
    const { facebookLogin } = this.props;
    facebookLogin(
      status => {
        this.props.navigation.navigate(strings.routeMain);
      },
      error => {
        error.message && ToastService.showToast(error.message);
      }
    );
  };

  isSignIn = () => {
    const { fetching, fetchingGoogle, fetchingFacebook } = this.props;
    return fetching || fetchingGoogle || fetchingFacebook;
  };

  render() {
    const { fetching, fetchingGoogle, fetchingFacebook } = this.props;
    return (
      <RenderLoginScreen
        error={this.state.error}
        navigation={this.props.navigation}
        handlePressSignIn={this.handlePressSignIn}
        handlePressSignUp={this.handlePressSignUp}
        onMainAuthScreen={this.onMainAuthScreen}
        fetching={fetching}
        handlePressGoogle={this.handlePressGoogleSignIn}
        handlePressFacebook={this.handlePressFacebookSignIn}
        fetchingGoogle={fetchingGoogle}
        fetchingFacebook={fetchingFacebook}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const { loginInfo } = state;
  return {
    fetching: loginInfo.fetching,
    error: loginInfo.error,
    data: loginInfo.data,
    fetchingGoogle: state.googleLoginInfor.fetching,
    fetchingFacebook: state.facebookLoginInfor.fetching,
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    googleLogin,
    facebookLogin,
  }
)(LoginScreen);
