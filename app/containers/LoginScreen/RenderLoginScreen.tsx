/* eslint-disable no-return-assign */
import { Content } from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationScreenProp } from "react-navigation";
import {
  AlertStatus,
  AuthButton,
  Heading,
  Input,
  AppBackground,
  AppHeader,
} from "../../components";
import I18n from "../../localization";
import { Colors, Images, strings } from "../../themes";
import { capitalize } from "../../tools";
import styles from "./styles";

const DEFAULT_DURATION = 500;
const DELAY_TIME = 150;

const AlertStatusAnim = Animatable.createAnimatableComponent(AlertStatus);

interface Props {
  fetching: boolean;
  error: boolean;
  navigation: NavigationScreenProp<any, any>;
  handlePressSignUp: () => void;
  handlePressGoogle: () => void;
  handlePressFacebook: () => void;
  handlePressSignIn: (arg1: object) => void;
  onMainAuthScreen: () => void;
  fetchingGoogle: boolean;
  fetchingFacebook: boolean;
}

export default class RenderLoginScreen extends Component<Props> {
  state = {
    email: "",
    password: "",
    animDuration: {
      usernameField: 0,
      passwordField: DELAY_TIME,
      buttonLogin: DELAY_TIME * 2,
      bottomWarning: 0,
      socialSignInContainer: DELAY_TIME * 3,
    },
    error: false,
  };
  willFocusListener: any;
  refEmailField: any;
  refPasswordField: any;
  refButtonField: any;
  refWarningBanner: any;
  refPasswordInput: any;
  refSocialSignInContainer: any;
  refOrText: any;

  componentDidMount() {
    const { navigation, error } = this.props;
    this.setState({
      error,
    });
    this.willFocusListener = navigation.addListener("willFocus", () => {
      this.refresh();
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ error: nextProps.error });
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  onMainAuthScreen = () => {
    this.props.onMainAuthScreen();
  };

  refresh = () => {
    this.doAnimate();
  };

  doAnimate = () => {
    const {
      usernameField,
      passwordField,
      buttonLogin,
      bottomWarning,
      socialSignInContainer,
    } = this.state.animDuration;
    if (this.refEmailField) {
      this.refEmailField.animate("fadeInLeft", DEFAULT_DURATION, usernameField);
    }
    if (this.refPasswordField) {
      this.refPasswordField.animate(
        "fadeInLeft",
        DEFAULT_DURATION,
        passwordField
      );
    }
    if (this.refButtonField) {
      this.refButtonField.animate("fadeInLeft", DEFAULT_DURATION, buttonLogin);
    }
    if (this.refWarningBanner) {
      this.refWarningBanner.animate(
        "fadeInUp",
        DEFAULT_DURATION,
        bottomWarning
      );
    }
    if (this.refSocialSignInContainer) {
      this.refSocialSignInContainer.animate(
        "fadeInLeft",
        DEFAULT_DURATION,
        socialSignInContainer
      );
    }
    if (this.refOrText) {
      this.refOrText.animate(
        "fadeInLeft",
        DEFAULT_DURATION,
        socialSignInContainer
      );
    }
  };

  handleChangeInput = (stateName: any, text: any) => {
    this.setState({
      [stateName]: text,
    });
  };

  handlePressSignIn = () => {
    this.props.handlePressSignIn({
      email: this.state.email,
      password: this.state.password,
    });

    // this.props.handlePressSignIn({
    //   email: "test@gmail.com",
    //   password: "abcxyc",
    // })
  };

  render() {
    const {
      fetching,
      handlePressFacebook,
      handlePressGoogle,
      fetchingGoogle,
      fetchingFacebook,
    } = this.props;
    const { error } = this.state;

    return (
      <AppBackground isLinear>
        <AppHeader
          leftIcon={Images.iconHome}
          leftTitleOnClick={this.onMainAuthScreen}
        />
        <Content style={loginStyle.loginContainer}>
          <Heading color={Colors.white} textAlign="center" margin={20}>
            {capitalize(I18n.t(strings.textLogin))}
          </Heading>
          <View style={loginStyle.formContainer}>
            <Animatable.View ref={c => (this.refEmailField = c)}>
              <Input
                isError={error}
                onFocus={() => {
                  this.setState({ error: false });
                }}
                label={capitalize(I18n.t(strings.textEmail))}
                icon={<Icon name="envelope-o" />}
                value={this.state.email}
                onChange={(text: any) => {
                  this.handleChangeInput("email", text);
                }}
                onSubmitEditing={() => {
                  if (this.refPasswordInput) {
                    this.refPasswordInput.focus();
                  }
                }}
              />
            </Animatable.View>
            <Animatable.View ref={c => (this.refPasswordField = c)}>
              <Input
                isError={error}
                onFocus={() => this.setState({ error: false })}
                label={capitalize(I18n.t(strings.textPassword))}
                ref={c => (this.refPasswordInput = c)}
                icon={<Icon name="key" />}
                value={this.state.password}
                marginTop={23}
                onChange={text => this.handleChangeInput("password", text)}
                secureTextEntry
              />
            </Animatable.View>

            <Animatable.View ref={c => (this.refButtonField = c)}>
              <AuthButton
                text={capitalize(I18n.t(strings.textLogin))}
                style={styles.button}
                onPress={this.handlePressSignIn}
                loading={fetching}
              />
            </Animatable.View>
          </View>
          <Animatable.Text
            style={styles.or}
            ref={ref => {
              this.refOrText = ref;
            }}
          >
            {I18n.t(strings.or)}
          </Animatable.Text>
          <Animatable.View
            style={styles.socialContainer}
            ref={ref => {
              this.refSocialSignInContainer = ref;
            }}
          >
            <SocialIcon
              type="google-plus-official"
              title="Google"
              loading={fetchingGoogle}
              style={styles.googleButton}
              onPress={handlePressGoogle}
            />
            <SocialIcon
              type="facebook"
              title="Facebook"
              loading={fetchingFacebook}
              style={styles.facebookButton}
              onPress={handlePressFacebook}
            />
          </Animatable.View>
          <Animatable.View />
        </Content>
        <AlertStatusAnim
          ref={c => (this.refWarningBanner = c)}
          textHelper={capitalize(I18n.t(strings.textDontHaveAnAccount))}
          textAction={capitalize(I18n.t(strings.textSignUp))}
          onPressAction={this.props.handlePressSignUp}
        />
      </AppBackground>
    );
  }
}

const loginStyle = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  formContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
