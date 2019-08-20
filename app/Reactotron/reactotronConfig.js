import Reactotron, { storybook, overlay, } from "reactotron-react-native"
import sagaPlugin from "reactotron-redux-saga"
import { reactotronRedux } from 'reactotron-redux'


console.tron = Reactotron

Reactotron.configure({ host: "localhost", })
  .useReactNative() // add all built-in react native plugins
  .use(sagaPlugin())
  // .use(reactotronRedux())

if (__DEV__) {
  Reactotron.connect()
  // LogConfig.configure({ enableLog: true, host: "localhost", })
  Reactotron.clear()
}
