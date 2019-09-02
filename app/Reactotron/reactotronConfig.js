import Reactotron, { storybook, overlay, trackGlobalErrors } from 'reactotron-react-native'
import sagaPlugin from 'reactotron-redux-saga'


const _TAG_NAME = 'Dinh dep trai'
import { Platform } from 'react-native'

console.tron = Reactotron
console.tlog = tlog

function tlog(tagName, preview, ...params) {
  if (__DEV__) {
    console.log(`[${_TAG_NAME}]:${Platform.OS.toUpperCase()}`, tagName, preview, params)
  } else {
    return
  }

  if (
    tagName && preview &&
    typeof tagName === 'string' &&
    typeof preview === 'object'
  ) {
    if (__DEV__) {
      Reactotron.display({
        name: `[${_TAG_NAME}]:${Platform.OS.toUpperCase()}-` + tagName,
        preview: JSON.stringify(preview),
        value: {...preview,...params},
      })

    } else {
      console.warn('TLOG', tagName)
    }

    return
  }

  if (
    tagName &&
    typeof tagName !== 'string' &&
    typeof tagName !== 'undefined'
  ) {
    if (__DEV__) {
      Reactotron.display({
        name: `[${_TAG_NAME}]:${Platform.OS.toUpperCase()}`,
        preview: JSON.stringify(tagName),
        value: tagName,
      })
    } else {
      console.warn('TLOG', tagName)
    }

    return
  }

  let mTagName =
    tagName && typeof tagName !== 'undefined'
      ? JSON.stringify(tagName)
      : 'TLOG'
  if (__DEV__) {
    let mPreview =
      preview && typeof preview !== 'undefined'
        ? JSON.stringify(preview)
        : JSON.stringify(params)

    let mValue = params.length == 1 ? params[0] : params
    if (params.length === 0) {
      mValue = mPreview
    }

    Reactotron.display({
      name: `[${_TAG_NAME}]:${Platform.OS.toUpperCase()}-` + mTagName,
      preview: mPreview,
      value: mValue,
    })
  } else {
    console.warn(
      mTagName,
      preview && typeof preview !== 'undefined' ? preview : '',
      params,
    )
  }
}

Reactotron.configure({ host: 'localhost', port: 9090 })
  .useReactNative() // add all built-in react native plugins
  .use(sagaPlugin())

if (__DEV__) {
  Reactotron.connect()
  // LogConfig.configure({ enableLog: true, host: "localhost", })
  Reactotron.clear()
}
