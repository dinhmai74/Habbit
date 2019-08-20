/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import {
  Animated,
  Image,
  InteractionManager,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { NavigationScreenProps } from 'react-navigation'

import {
  AlertStatus,
  AppText,
  AuthButton,
  Heading,
  TextButton,
} from '../../components'
import AppBackground from '../../components/AppBackground'
import AppHeader from '../../components/AppHeader'
import I18n from '../../localization'
import {
  ApplicationStyles,
  Colors,
  Images,
  Metrics,
  strings,
} from '../../themes'
import { capitalize } from '../../tools'
import styles from './styles'

const DEFAULT_DURATION = 500
const DELAY_TIME = 100

const AlertStatusAnim = Animatable.createAnimatableComponent(AlertStatus)

export default class RenderAuthScreen extends Component<NavigationScreenProps> {
  state = {
    logoAnimDuration: 0,
    signInButtonDuration: 0,
    bottomAlertDuration: 0,
  }
  refBottomAlert: any;
  willFocusListener: any;
  refLogo: any;
  refSignIn: any;

  componentDidMount() {
    const { navigation } = this.props
    this.willFocusListener = navigation.addListener('willFocus', () => {
      this.refresh()
    })
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }

  handlePressSignIn = () => {
    this.props.navigation.navigate(strings.routeLogin, {
      refresh: this.refresh,
    })
  }

  handlePressSignUp = () => {
    this.props.navigation.navigate(strings.routeSignUp, {
      refresh: this.refresh,
    })
  }

  refresh = () => {
    this.doAnimate()
  }

  doAnimate = () => {
    const {
      logoAnimDuration,
      bottomAlertDuration,
      signInButtonDuration,
    } = this.state

    if (this.refLogo) {
      this.refLogo.animate('fadeInDown', DEFAULT_DURATION, logoAnimDuration)
    }

    if (this.refBottomAlert) {
      this.refBottomAlert.animate(
        'fadeInUp',
        DEFAULT_DURATION,
        bottomAlertDuration,
      )
    }

    if (this.refSignIn) {
      this.refSignIn.animate(
        'fadeInLeft',
        DEFAULT_DURATION,
        signInButtonDuration,
      )
    }
  }

  render() {
    return (
      <AppBackground isLinear>
        <AppHeader />
        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.loginContainer}>
            <Animatable.View ref={(c) => (this.refLogo = c)}>
              <Image source={Images.topLogo} style={styles.logo} />
            </Animatable.View>
            <Animatable.View>
              <Heading marginTop={20} color={Colors.white} textAlign='center'>
                {I18n.t(strings.titleMainAuth)}
              </Heading>
              <Heading
                marginTop={16}
                color={Colors.white}
                element='h3'
                textAlign='center'
              >
                {I18n.t(strings.titleSubMainAuth)}
              </Heading>
            </Animatable.View>
            <Animatable.View ref={(c) => (this.refSignIn = c)}>
              <AuthButton
                onPress={this.handlePressSignIn}
                text={capitalize(I18n.t(strings.textLogin))}
                style={styles.button}
              />
            </Animatable.View>
          </View>
        </ScrollView>
        <AlertStatusAnim
          ref={(c) => (this.refBottomAlert = c)}
          textHelper={capitalize(I18n.t(strings.textDontHaveAnAccount))}
          textAction={capitalize(I18n.t(strings.textSignUp))}
          onPressAction={this.handlePressSignUp}
        />
      </AppBackground>
    )
  }
}
