/* eslint-disable react/require-default-props */
import { Text } from 'native-base'
import React, { PureComponent } from 'react'
import { StyleSheet, TextProperties } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../themes'

import { getStyleFromProps } from '../../tools'

interface IProps {
  style?: object
  text?: string
  inBackground?: boolean
}

type Props = IProps & TextProperties

export default class AppText extends PureComponent<Props> {
  static defaultProps = {
    style: null,
    text: '',
    inBackground: false,
  }

  render() {
    return (
      <Text
        {...this.props}
        style={[
          styles.styleText,
          {
            color: this.props.inBackground
              ? Colors.textInBackground
              : Colors.text.text,
          },
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    )
  }
}
const styles = StyleSheet.create({
  styleText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    includeFontPadding: false,
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
})
