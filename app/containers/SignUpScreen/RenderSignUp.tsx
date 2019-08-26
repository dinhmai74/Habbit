/* eslint-disable no-return-assign */
import React, { Component, Props } from 'react'
import { ScrollView, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  AlertStatus,
  AppBackground,
  AuthButton,
  Heading,
  Input,
} from '../../components'
import AppHeader from '../../components/AppHeader'
import I18n from '../../localization'
import { Images, strings } from '../../themes'
import { capitalize } from '../../tools'
import styles from './styles'

const DEFAULT_DURATION = 500
const DELAY_TIME = 100

interface IProps {
  navigation: any
// tslint:disable-next-line: ban-types
  onSignUpPress: Function,
  fetching: boolean
  error: {
    userName: boolean
    email: boolean
    password: boolean,
  }
}

type TypeNameField= 'userName'|'email'|'password'

const AlertStatusAnim = Animatable.createAnimatableComponent(AlertStatus)

export default class RenderSignUpScreen extends Component<IProps> {
  state = {
    userName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    animation: {
      usernameField: 0,
      emailField: DELAY_TIME,
      passwordField: DELAY_TIME * 2,
      passwordRepeatField: DELAY_TIME * 3,
      buttonCreate: DELAY_TIME * 4,
      bottomWarning: 0,
    },
    error: {
      userName: false,
      email: false,
      password: false,
    },
  }
  willFocusListener: any;
  refUsernameField: any;
  refEmailField: any;
  refPasswordField: any;
  refPasswordRepeatField: any;
  refButtonField: any;
  refWarningBanner: any;
  refUsernameInput: Input | null | undefined;
  refEmailInput: any;
  refPasswordInput: any;
  refPasswordRepeatInput: any;

  componentDidMount() {
    const { navigation, error } = this.props
    this.setState({
      error,
    })
    this.willFocusListener = navigation.addListener('willFocus', () => {
      this.refresh()
    })
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({ error: nextProps.error })
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }

  refresh = () => {
    this.doAnimate()
  }

  doAnimate = () => {
    const {
      usernameField,
      emailField,
      passwordField,
      passwordRepeatField,
      buttonCreate,
      bottomWarning,
    } = this.state.animation
    if (this.refUsernameField) {
      this.refUsernameField.animate(
        'fadeInLeft',
        DEFAULT_DURATION,
        usernameField,
      )
    }
    if (this.refEmailField) {
      this.refEmailField.animate('fadeInLeft', DEFAULT_DURATION, emailField)
    }
    if (this.refPasswordField) {
      this.refPasswordField.animate(
        'fadeInLeft',
        DEFAULT_DURATION,
        passwordField,
      )
    }
    if (this.refPasswordRepeatField) {
      this.refPasswordRepeatField.animate(
        'fadeInLeft',
        DEFAULT_DURATION,
        passwordRepeatField,
      )
    }
    if (this.refButtonField) {
      this.refButtonField.animate('fadeInLeft', DEFAULT_DURATION, buttonCreate)
    }
    if (this.refWarningBanner) {
      this.refWarningBanner.animate('fadeInUp', DEFAULT_DURATION, bottomWarning)
    }
  }

  /**
   * private methods
   *
   */

  onMainAuthScreen = () => {
    this.props.navigation.navigate(strings.routeMainAuth)
  }

  handleChangeInput = (stateName: TypeNameField, text: string) => {
    this.setState({
      [stateName]: text,
    })
  }

  /**
   *  handle events
   *
   */
  handlePressSignUp = () => {
    const { email, userName, password, passwordRepeat } = this.state
    if (this.props.onSignUpPress ) {
      this.props.onSignUpPress({
      email,
      password,
      passwordRepeat,
      userName,
    })
    }
  }

  handleLogin = () => {
    this.props.navigation.navigate(strings.routeLogin)
  }

  focus = (type: TypeNameField) => {
    const { error } = this.state
    error[type] = false
    this.setState({
      error,
    })
  }

  /**
   * render
   *
   **/

  render() {
    const { animation, error } = this.state
    const { fetching } = this.props
    return (
      <AppBackground isLinear>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <View style={styles.loginContainer}>
            <AppHeader
              leftIcon={Images.iconHome}
              leftTitleOnClick={this.onMainAuthScreen}
            />
            <Animatable.View>
              <Heading color='#ffffff' textAlign='center' marginBottom={10}>
                {capitalize(I18n.t(strings.textSignUp))}
              </Heading>
            </Animatable.View>
            <ScrollView style={{ flexGrow: 1, paddingBottom: 10 }}>
              <View style={styles.formContainer}>
                <Animatable.View ref={(c) => (this.refUsernameField = c)}>
                  <Input
                    isError={error.userName}
                    onFocus={() => this.focus('userName')}
                    label={capitalize(I18n.t(strings.textUsername))}
                    icon={<Icon name='user' />}
                    ref={(c: any) => (this.refUsernameInput = c)}
                    value={this.state.userName}
                    // @ts-ignore
                    onChange={this.handleChangeInput.bind(this, 'userName')}
                    onSubmitEditing={() => {
                      if (this.refEmailInput) { this.refEmailInput.focus() }
                    }}
                  />
                </Animatable.View>
                <Animatable.View ref={(c) => (this.refEmailField = c)}>
                  <Input
                    isError={error.email}
                    onFocus={() => this.focus('email')}
                    label={capitalize(I18n.t(strings.textEmail))}
                    icon={<Icon name='envelope-o' />}
                    value={this.state.email}
                    ref={(c: any) => (this.refEmailInput = c)}
                    marginTop={23}
                    // @ts-ignore
                    onChange={this.handleChangeInput.bind(this, 'email')}
                    onSubmitEditing={() => {
                      if (this.refPasswordInput) { this.refPasswordInput.focus() }
                    }}
                  />
                </Animatable.View>

                <Animatable.View ref={(c) => (this.refPasswordField = c)}>
                  <Input
                    isError={error.password}
                    label={capitalize(I18n.t(strings.textPassword))}
                    icon={<Icon name='key' />}
                    value={this.state.password}
                    ref={(c: any) => (this.refPasswordInput = c)}
                    marginTop={23}
                    // @ts-ignore
                    onChange={this.handleChangeInput.bind(this, 'password')}
                    secureTextEntry
                    onSubmitEditing={() => {
                      if (this.refPasswordRepeatInput) {
                        this.refPasswordRepeatInput.focus()
                      }
                    }}
                  />
                </Animatable.View>

                <Animatable.View ref={(c) => (this.refPasswordRepeatField = c)}>
                  <Input
                    isError={error.password}
                    onFocus={() => this.focus('password')}
                    label={capitalize(I18n.t(strings.textPasswordRepeated))}
                    icon={<Icon name='key' />}
                    value={this.state.passwordRepeat}
                    ref={(c: any) => {
                      return (this.refPasswordRepeatInput = c);
                    }}
                    marginTop={23}
                    onChange={this.handleChangeInput.bind(
                      this,
                    // @ts-ignore
                      'passwordRepeat',
                    )}
                    secureTextEntry
                  />
                </Animatable.View>

                <Animatable.View
                  animation='fadeInLeft'
                  duration={animation.buttonCreate}
                  ref={(c) => (this.refButtonField = c)}
                >
                  <AuthButton
                    text={capitalize(I18n.t(strings.textSignUp))}
                    style={styles.button}
                    onPress={() => this.handlePressSignUp()}
                    loading={fetching}
                  />
                </Animatable.View>
              </View>
              <View style={{ paddingBottom: 20 }} />
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
        <AlertStatusAnim
          ref={(c) => (this.refWarningBanner = c)}
          textHelper={capitalize(I18n.t(strings.textAlreadyHaveAnAccount))}
          textAction={capitalize(I18n.t(strings.textLogin))}
          onPressAction={this.handleLogin}
        />
      </AppBackground>
    )
  }
}
