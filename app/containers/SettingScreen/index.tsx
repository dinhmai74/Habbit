/* eslint-disable react/prop-types */
// @flow
import { View } from "native-base";
import React, { Component } from "react";
import { AsyncStorage, Platform } from "react-native";
import { LayoutAnimation, UIManager } from "react-native";
import { Overlay, Text } from "react-native-elements";
import firebase from "react-native-firebase";
import { NavigationScreenProps } from "react-navigation";
import { GoogleSignin } from "react-native-google-signin";
import FirebaseWorker from "../../api/firebase";
import { ToastService } from "../../components";
import I18n from "../../localization";
import { Colors, Metrics, strings } from "../../themes";
import Instructions from "./components/Instructions";
import Profile from "./components/Profile";
import RenderSettingScreen from "./renderSettingScreen";
import { LoginManager } from "react-native-fbsdk";
type Props = NavigationScreenProps & {};
interface IState {
  isHelpOverlayShowUp: boolean;
  isProfileOverlayShowUp: boolean;
  profileLoading: boolean;
  userName: string;
}

type TStateField =
  | "isHelpOverlayShowUp"
  | "isProfileOverlayShowUp"
  | "profileLoading";

export default class SettingScreen extends Component<Props, IState> {
  state = {
    isHelpOverlayShowUp: false,
    isProfileOverlayShowUp: false,
    profileLoading: false,
    userName: "",
  };

  async componentDidMount() {
    const user: any = await firebase.auth().currentUser;
    const userName = user.displayName;
    this.setState({
      userName,
    });
  }

  componentWillUpdate() {
    // tslint:disable-next-line: no-unused-expression
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  closeOverlay = (type: TStateField) => {
    // @ts-ignore
    this.setState({ [type]: false });
  };

  onLogoutPress = async () => {
    const typeLogin = await AsyncStorage.getItem(strings.typeSignIn);
    let signOutPromises;
    switch (typeLogin) {
      case strings.email: {
        signOutPromises = null;
        break;
      }
      case strings.googleSignIn: {
        signOutPromises = await GoogleSignin.signOut();
        break;
      }
      case strings.facebookSignIn: {
        signOutPromises = await LoginManager.logOut();
        break;
      }
    }
    await Promise.all([firebase.auth().signOut(), signOutPromises])
      .then(_ => {
        AsyncStorage.clear();
        this.props.navigation.navigate(strings.routeAuth);
      })
      .catch(error => {
        ToastService.showToast(error.message);
      });
  };

  onHelpPress = () => {
    this.setState({
      isHelpOverlayShowUp: true,
    });
  };

  onProfilePress = () => {
    this.setState({
      isProfileOverlayShowUp: true,
    });
  };

  onProfileUpdate = async (
    userName: string,
    oldPassword: string,
    password: string,
    email: string
  ) => {
    this.setState({
      profileLoading: true,
    });

    const result = await FirebaseWorker.updateProfile(
      userName,
      oldPassword,
      password,
      email
    );
    if (result.error) {
      ToastService.showToast(result.message);
      this.setState({
        profileLoading: false,
      });
    } else {
      ToastService.showToast(I18n.t(strings.textUpdateSuccess), "success");
      this.setState({
        profileLoading: false,
      });
    }
  };

  onBackProfileButtonPress = async () => {
    const user = await firebase.auth().currentUser;
    // @ts-ignore
    const userName = user.displayName;
    // @ts-ignore
    this.setState({
      userName,
    });
    this.closeOverlay("isProfileOverlayShowUp");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RenderSettingScreen
          onLogoutPress={this.onLogoutPress}
          onHelpPress={this.onHelpPress}
          onProfilePress={this.onProfilePress}
          userName={this.state.userName}
        />
        <Instructions
          buttonOnPress={() => this.closeOverlay("isHelpOverlayShowUp")}
          isVisible={this.state.isHelpOverlayShowUp}
          onBackdropPress={() => this.closeOverlay("isHelpOverlayShowUp")}
          onBackButtonPress={() => this.closeOverlay("isHelpOverlayShowUp")}
        />

        <Profile
          loading={this.state.profileLoading}
          buttonOnPress={this.onProfileUpdate}
          isVisible={this.state.isProfileOverlayShowUp}
          onBackdropPress={() => this.closeOverlay("isProfileOverlayShowUp")}
          onBackButtonPress={this.onBackProfileButtonPress}
        />
      </View>
    );
  }
}
