import { Text } from 'native-base'
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  StyleSheetProperties,
  TextProperties,
  View,
  ViewStyle,
} from 'react-native'
import styled from 'styled-components'
import { Colors, Metrics } from '../../themes'
import Divider from '../Divider'
import AppText from './AppText'

interface IProps {
  style?: ViewStyle
  dividerColor?: string
  textStyle?: StyleSheetProperties
  text?: string
}

export default class InlineDecorationText extends PureComponent<
  IProps & TextProperties
> {
  static defaultProps = {
    style: null,
    dividerColor: null,
    textStyle: null,
    text: null,
  }

  render() {
    const { style, dividerColor, textStyle, text } = this.props
    if (text) {
      return (
        <RowView style={style}>
          <Divider color={dividerColor} style={styles.divider} />
          <Text {...this.props} style={{ ...styles.text, ...textStyle }}>
            {text}
          </Text>
          <Divider color={dividerColor} style={styles.divider} />
        </RowView>
      )
    }

    return null
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.inActiveText,
  },
  divider: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },
})

const RowView = styled(View)`
  flex-direction: row;
`
