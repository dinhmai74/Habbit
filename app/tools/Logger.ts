import Reactotron from 'reactotron-react-native'

export const logReactotron = (...values) => __DEV__ && Reactotron.log(...values)
export const warnReactotron = (...values) =>
  __DEV__ && Reactotron.warn(...values)
export const errorReactotron = values => __DEV__ && Reactotron.error(values)
