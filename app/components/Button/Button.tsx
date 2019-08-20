import React, { PureComponent } from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../../themes'

const styles = StyleSheet.create({
  wideButton: {
    borderColor: Colors.lightGray,
    borderRadius: Metrics.circleButtonRadius,
    backgroundColor: Colors.bloodOrange,
    padding: Metrics.buttonPadding,
    paddingLeft: Metrics.buttonPadding * 4,
    paddingRight: Metrics.buttonPadding * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface Props  {
  disable?: boolean,
  style?: object,
  // eslint-disable-next-line no-undef
  children?: any,
  backgroundColor?: string,
  onPress?: () => void ,
}
export default class Button extends PureComponent<Props> {
  static defaultProps = {
    disable: false,
    style: null,
    children: null,
    backgroundColor: Colors.green,
    onPress: () => {},
  }

  onPress = () => {
    if (this.props.onPress) { this.props.onPress() }
  }

  render() {
    const { disable, style, children, backgroundColor } = this.props
    const opacity = disable ? 1 : 0.4

    return (
      <TouchableOpacity
        activeOpacity={opacity}
        style={{
          ...styles.wideButton,
          backgroundColor,
          ...style,
        }}
        onPress={this.onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
