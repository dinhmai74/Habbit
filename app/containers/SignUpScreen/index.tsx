/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'

import { signUp } from '../../actions'
import { ToastService } from '../../components'
import I18n from '../../localization'
import { strings } from '../../themes'
import RenderSignUpScreen from './RenderSignUp'

interface IProps {
  navigation: NavigationScreenProp<any, any>
  signUp: (arg0: object, ...arg2: any) => void
  fetching: boolean
}

class SignUpScreen extends Component<IProps> {
  state = {
    userName: false,
    email: false,
    password: false,
    passwordRepeated: false,
  }

  resetState = () => {
    this.setState({
      userName: false,
      email: false,
      password: false,
      passwordRepeated: false,
    })
  }

  onSignUpPress = (userInfo: any) => {
    const validInfo = this.validate(userInfo)

    if (validInfo) {
      const { email, password, userName } = userInfo

      this.props.signUp(
        { email, password, userName },
        (data: any) => {
          if (!data.error) {
            this.props.navigation.navigate(strings.routeMain)
          }
        },
        (err: any) => {
          const emailRex = /.*\b(email)\b.*/gi
          const passwordRex = /.*\b(password)\b.*/gi
          if (emailRex.test(err.message)) {
            this.setState({
              email: true,
            })
          } else if (passwordRex.test(err.message)) {
            this.setState({
              password: true,
            })
          } else {
            this.resetState()
          }

          ToastService.showToast(err.message)
        },
      )
    }
  }

  validate = (userInfo: any): boolean => {
    const { email, password, passwordRepeat, userName } = userInfo

    const isValidUserName = this.validateUsername(userName)
    const isValidEmail = this.validateEmail(email)
    const isValidPassword = this.validatePassword(password, passwordRepeat)

    this.setState({
      userName: !isValidUserName.flag,
    })
    if (!isValidUserName.flag) {
      ToastService.showToast(isValidUserName.message)
      return false
    }
    this.setState({
      email: !isValidEmail.flag,
    })
    if (!isValidEmail.flag) {
      ToastService.showToast(isValidEmail.message)
      return false
    }
    this.setState({
      password: !isValidPassword.flag,
    })
    if (!isValidPassword.flag) {
      ToastService.showToast(isValidPassword.message)
      return false
    }

    return true
  }

  validateUsername = (userName: string): { flag: boolean; message: string } => {
    if (!userName) {
      return {
        flag: false,
        message: I18n.t(strings.errMessYourUserNameIsEmpty),
      }
    }

    return {
      flag: true,
      message: '',
    }
  }

  validateEmail = (email: string): { flag: boolean; message: string } => {
    if (!email) {
      return {
        flag: false,
        message: I18n.t(strings.errMessYourEmailIsEmpty),
      }
    }

    return { flag: true, message: '' }
  }

  validatePassword = (
    password: string,
    passwordRepeat: string,
  ): { flag: boolean; message: string } => {
    if (!password) {
      return {
        flag: false,
        message: I18n.t(strings.errMessYourPasswordIsEmpty),
      }
    }
    if (password !== passwordRepeat) {
      return {
        flag: false,
        message: I18n.t(strings.errMessUnmatchedPassword),
      }
    }
    return {
      flag: true,
      message: '',
    }
  }

  render() {
    const { ...error } = this.state
    return (
      <RenderSignUpScreen
        navigation={this.props.navigation}
        onSignUpPress={this.onSignUpPress}
        fetching={this.props.fetching}
        error={error}
      />
    )
  }
}

const mapStateToProps = (state: any) => {
  const { signUpInfo } = state
  return {
    fetching: signUpInfo.fetching,
    error: signUpInfo.error,
    data: signUpInfo.data,
  }
}

export default connect(
  mapStateToProps,
  {
    signUp,
  },
  // @ts-ignore
)(SignUpScreen)
