import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../themes'
import { AppText } from '../Text'
import Button from './Button'

interface Props {
  disable?: boolean,
  style?: object,
  text: string,
  textStyle?: object,
  textColor?: string,
  onPress?: () => void ,
}

export default class TextButton extends PureComponent<Props> {
  static defaultProps = {
    disable: false,
    style: null,
    textStyle: null,
    textColor: Colors.textInBackground,
    onPress: () => {},
  }

  render() {
    const { disable, style, text, textStyle, textColor } = this.props

    return (
      <Button
        {...this.props}
        disable={disable}
        style={style}
        onPress={this.props.onPress}
      >
        <AppText style={[styles.text, textStyle, { color: textColor }]}>
          {text}
        </AppText>
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Fonts.size.input,
  },
})
