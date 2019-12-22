import { Container, Root, StyleProvider } from "native-base";
import React, { Component } from "react";
import { YellowBox } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { Provider } from "react-redux";
import "./app/localization/I18n";
import RootNavigator from "./app/router/RootNavigator";
import store from "./app/store";
import NavigateService from "./app/tools/NavigateService";
import { ElementTheme } from "./ElementStyle";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material.js";

// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Cannot update during an existing state",
  "Overriding previous layout animation with new one before the first began",
  "Required dispatch",
  "Deprecation",
]);

class App extends Component {
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
