import {
  Body,
  Content as NativeBaseContent,
  H2,
  Header as NativeHeader,
  Icon,
  Left,
  Row as NativeRow,
} from "native-base";
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import firebase from "react-native-firebase";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";
import I18n from "../../../localization";

import { ToastService } from "../../../components";
import { Colors, Metrics, strings, spacing } from "../../../themes";
import { capitalize } from "../../../tools";
import ProfileInput from "./ProfileInput";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: Metrics.screenHeight * 0.7,
    width: Metrics.screenWidth * 0.9,
  },
  inputContainer: {
    borderColor: Colors.linearStart,
  },
  input: {
    marginLeft: 10,
  },
  noBorder: {
    borderColor: "transparent",
  },
  label: {
    margin: 5,
    color: Colors.linearStart,
  },
  text: {
    borderColor: "transparent",
    padding: 10,
  },
  icon: {
    padding: 5,
    alignSelf: "flex-start",
  },
  swipeRightIcon: {
    backgroundColor: Colors.success,
  },
  swipeLeftIcon: {
    backgroundColor: Colors.buttonColorInColoredBackground,
    alignSelf: "flex-end",
  },
  touchIcon: { color: Colors.yellow, padding: 10 },
  instructionText: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    borderRadius: 50,
    padding: 5,
    paddingVertical: spacing[2],
    margin: Metrics.sidesPadding,
    marginBottom: 30,
  },
  buttonLoading: {
    padding: 10,
  },
  bottomImage: {
    bottom: 0,
    left: 0,
    right: 0,
    width: Metrics.screenWidth,
    height: 150,
  },
});
interface IProps {
  // eslint-disable-next-line react/require-default-props
  buttonOnPress: Function;
  onBackButtonPress: Function;
  onBackdropPress?: Function;
  loading: boolean;
  isVisible?: boolean;
}

type TInput = "userName" | "password" | "passwordRepeated" | "oldPassword";
interface IState {
  email: string;
  userName: string;
  password: string;
  oldPassword: string;
  passwordRepeated: string;
  userNameError: boolean;
  passwordError: boolean;
  oldPasswordError: boolean;
}

export default class Profile extends PureComponent<IProps, IState> {
  static defaultProps = {
    buttonOnPress: () => {},
    onBackButtonPress: () => {},
  };
  state = {
    email: "",
    userName: "",
    password: "",
    oldPassword: "",
    passwordRepeated: "",
    passwordError: false,
    userNameError: false,
    oldPasswordError: false,
  };

  async componentDidMount() {
    const user = await firebase.auth().currentUser;
    if (user) {
      // @ts-ignore
      this.setState({
        userName: user.displayName,
        email: user.email,
      });
    }
  }

  handleChangeInput = (stateName: TInput, text: string) => {
    let resetError = "email";
    if (stateName === "oldPassword") {
      resetError = "oldPasswordError";
    } else if (stateName === "password" || stateName === "passwordRepeated") {
      resetError = "passwordError";
    } else if (stateName === "userName") {
      resetError = "userNameError";
    }

    // @ts-ignore
    this.setState({
      [stateName]: text,
      [resetError]: false,
    });
  };

  buttonOnPress = () => {
    const { userName, password, oldPassword, email } = this.state;
    const isValidInfo = this.validateInfo();
    if (isValidInfo) {
      this.props.buttonOnPress(userName, oldPassword, password, email);
    }
  };

  validateInfo = () => {
    const { userName, password, passwordRepeated, oldPassword } = this.state;
    const isValidUserName = this.validateUserName(userName);
    const isValidPassword = this.validatePassword(password, passwordRepeated);
    if (!oldPassword) {
      ToastService.showToast(I18n.t(strings.errMessYourPasswordIsEmpty));
    }
    this.setState({
      userNameError: !isValidUserName,
      passwordError: !isValidPassword,
      oldPasswordError: !oldPassword,
    });

    return isValidPassword && isValidUserName && oldPassword;
  };

  validateUserName = (userName: string) => {
    if (!userName) {
      ToastService.showToast(I18n.t(strings.errMessYourUserNameIsEmpty));
      return false;
    }
    return true;
  };

  validatePassword = (password: string, passwordRepeated: string) => {
    if (password !== passwordRepeated) {
      ToastService.showToast(I18n.t(strings.errMessUnmatchedPassword));
      return false;
    }

    return true;
  };

  render() {
    const { loading, ...rest } = this.props;
    const {
      email,
      userName,
      password,
      oldPassword,
      passwordRepeated,
      userNameError,
      passwordError,
      oldPasswordError,
    } = this.state;
    return (
      // @ts-ignore
      <Overlay
        {...rest}
        backdropColor="rgba(172,172,172, 0.6)"
        backdropTransitionOutTiming={230}
        fullScreen
      >
        <View style={{ flex: 1 }}>
          <Header transparent noShadow>
            <Left>
              <Icon
                name="close"
                style={styles.icon}
                type="AntDesign"
                // @ts-ignore
                onPress={loading ? () => {} : this.props.onBackButtonPress}
              />
            </Left>
            <Body style={styles.noBorder}>
              <H2 style={[styles.text]}>
                {capitalize(I18n.t(strings.titleProfile))}
              </H2>
            </Body>
          </Header>

          <Content
            style={{
              paddingLeft: Metrics.sidesPadding,
              paddingRight: Metrics.sidesPadding,
            }}
          >
            <ProfileInput
              icon="user-o"
              label={capitalize(I18n.t(strings.textUsername))}
              placeholder={capitalize(I18n.t(strings.textUsername))}
              value={userName}
              error={userNameError}
              onChangeText={text => this.handleChangeInput("userName", text)}
            />
            <ProfileInput
              icon="email-outline"
              type="MaterialCommunityIcons"
              label={capitalize(I18n.t(strings.textEmail))}
              defaultValue={email}
              value={email}
              disabled
              placeholder={capitalize(I18n.t(strings.textEmail))}
            />

            <ProfileInput
              icon="key"
              type="SimpleLineIcons"
              label={capitalize(I18n.t(strings.textPassword))}
              placeholder={capitalize(I18n.t(strings.textPassword))}
              onChangeText={text => this.handleChangeInput("password", text)}
              value={password}
              error={passwordError}
              secureTextEntry
            />
            <ProfileInput
              icon="key"
              type="SimpleLineIcons"
              label={capitalize(I18n.t("textPasswordRepeated"))}
              placeholder={capitalize(I18n.t("textPasswordRepeated"))}
              value={passwordRepeated}
              onChangeText={text =>
                this.handleChangeInput("passwordRepeated", text)
              }
              error={passwordError}
              secureTextEntry
            />

            <ProfileInput
              icon="key"
              type="SimpleLineIcons"
              label={capitalize(I18n.t("textOldPassword"))}
              placeholder={capitalize(I18n.t("textOldPassword"))}
              value={oldPassword}
              onChangeText={text => this.handleChangeInput("oldPassword", text)}
              error={oldPasswordError}
              secureTextEntry
            />
          </Content>
          <Button
            linearGradientProps={{
              colors: [Colors.linearStart, Colors.linearEnd],
              start: { x: 1, y: 0 },
              end: { x: 0.2, y: 0 },
            }}
            containerStyle={{ marginTop: 5, paddingVertical: spacing[4] }}
            ViewComponent={LinearGradient} // Don't forget this!
            buttonStyle={styles.button}
            loadingStyle={styles.buttonLoading}
            onPress={this.buttonOnPress}
            title={capitalize(I18n.t(strings.textOk))}
            loading={loading}
            disabled={loading}
          />
        </View>
      </Overlay>
    );
  }
}

const Header = styled(NativeHeader)`
  width: 100%;
`;
const Content = styled(NativeBaseContent)`
  padding: 10px;
  margin: 20px 0px;
`;
