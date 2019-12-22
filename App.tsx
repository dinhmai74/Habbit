import { Container, Root, StyleProvider, View } from "native-base";
import { ThemeProvider } from "react-native-elements";
import React, { Component } from "react";
import { Provider } from "react-redux";
import Reactotron from "reactotron-react-native";
import "./app/localization/I18n";

import { AsyncStorage, NativeModules, Platform, YellowBox } from "react-native";
import firebase from "react-native-firebase";
import { ElementTheme } from "./ElementStyle";
import RootNavigator from "./app/router/RootNavigator";
import store from "./app/store";
import strings from "./app/themes/strings";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material.js";
import StorybookUIHMRRoot from "./storybook";
import NavigateService from "./app/tools/NavigateService";

// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Cannot update during an existing state",
  "Overriding previous layout animation with new one before the first began",
  "Required dispatch",
  "Deprecation"
]);

class App extends Component {
  async componentDidMount() {
    const user = await firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log("user token:\n ", token);
    }
  }

  render() {
    return (
      <ThemeProvider theme={ElementTheme}>
        <Root>
          <StyleProvider style={getTheme(material)}>
            <Container>
              <Provider store={store}>
                <RootNavigator
                  ref={navigatorRef => {
                    NavigateService.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </Provider>
            </Container>
          </StyleProvider>
        </Root>
      </ThemeProvider>
    );
  }
}

//  Don't know why but can't use this plugin when used redux-offline
// export default Reactotron.overlay(
// // @ts-ignore
//   Reactotron.storybookSwitcher(StorybookUIHMRRoot)(App),
// )

// uncomment this line to use story book
// export default StorybookUIHMRRoot
export default App;
