import { Separator, Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, StyleSheetProperties } from 'react-native'
import { Colors } from '../../../themes'
import styles from '../styles'

interface IProps {
  // eslint-disable-next-line no-undef
  children?: JSX.Element
  title: string
  style?: StyleSheetProperties
}

export default class GroupItem extends Component<IProps> {
  static defaultProps = {
    children: null,
    style: null,
  }

  render() {
    const { title, style } = this.props
    return (
      <View style={[styles.groupContainer, style]}>
        <Text uppercase style={styles.separator}>
          {title}
        </Text>
        <View style={[styles.groupContent]}>{this.props.children}</View>
      </View>
    )
  }
}
