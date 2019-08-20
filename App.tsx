import { Container, Root, StyleProvider, View } from 'native-base'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Reactotron from 'reactotron-react-native'
import './app/localization/I18n'

import { AsyncStorage, NativeModules, Platform } from 'react-native'
import firebase from 'react-native-firebase'
import RootNavigator from './app/router/RootNavigator'
import store from './app/store'
import strings from './app/themes/strings'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material.js'
import StorybookUIHMRRoot from './storybook'

// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

class App extends Component {
  async componentDidMount() {
    const user = await firebase.auth().currentUser
    if (user) {
      const token = await user.getIdToken()
      console.log('user token:\n ', token)
    }
  }
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Provider store={store}>
              <RootNavigator />
            </Provider>
          </Container>
        </StyleProvider>
      </Root>
    )
  }
}

//  Don't know why but can't use this plugin when used redux-offline
// export default Reactotron.overlay(
// // @ts-ignore
//   Reactotron.storybookSwitcher(StorybookUIHMRRoot)(App),
// )

// uncomment this line to use story book
// export default StorybookUIHMRRoot
export default App
