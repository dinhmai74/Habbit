import { Body, Row } from 'native-base'
import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components'
import { AppButton, Icon, SizedBox, ToastService } from '../../components'
import AppBackground from '../../components/app-background/AppBackground'
import { Metrics as metrics } from '../../themes'
import { Colors as color, palette } from '../../themes'
import { screen } from '../../themes/Metrics'
import NavigateService from '../../tools/NavigateService'

export interface IAuthScreenProps extends NavigationInjectedProps {}
interface State {
  user: any
}

const StyledBody = styled(Body)``

const StyledButton = styled(AppButton)`
  background: ${color.transparent};
  border-color: ${palette.white};
`

export class AuthScreen extends Component<IAuthScreenProps, State> {
  unsubscriber: any

  constructor(props: IAuthScreenProps) {
    super(props)
    this.unsubscriber = null
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user })
    })
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber()
    }
  }

  render() {
    if (this.state.user) {
      ToastService.showToast(
        'message.loginSuccess',
        'success',
        () => {
          NavigateService.navigate('main')
        },
        'bottom',
        1000
      )
    }
    return (
      <AppBackground isLinear>
        <StyledBody>
          <SizedBox style={{ height: screen.height * 0.25 }} />
          <Icon icon='logoWithText' size={metrics.logo.normal} />
          <SizedBox height={5} />
          <Row>
            <StyledButton
              tx='title.login'
              margin={5}
              padding={2}
              type='outline'
              onPress={() => NavigateService.navigate('login')}
            />
            <StyledButton
              tx='title.signUp'
              margin={5}
              padding={2}
              type='outline'
              onPress={() => NavigateService.navigate('signUp')}
            />
          </Row>
        </StyledBody>
      </AppBackground>
    )
  }
}

export default AuthScreen
