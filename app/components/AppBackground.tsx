import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {  Colors } from '../themes'

interface IProps  {
  isLinear?: boolean,
  style?: object,
  children?: object
}

const AppBackground = (props: IProps ) => {
  if (props.isLinear) {
    return (
      <LinearGradient
        {...props}
        colors={[Colors.linearStart, Colors.linearEnd]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1.0 }}
        locations={[0, 0.8]}
        style={{ flex: 1}}
      >
        {props.children}
      </LinearGradient>
    )
  }

  return (
    <View
      {...props}
      style={[{flex: 1}, props.style]}
    >
      {props.children}
    </View>
  )
}

export default AppBackground
