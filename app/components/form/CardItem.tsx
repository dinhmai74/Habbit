import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { ApplicationStyles } from '../../themes'
import { getPlatformElevation } from '../../tools'

export default class CardItem extends PureComponent {
  render() {
    return (
      <View
        // @ts-ignore
        {...this.props}
        // @ts-ignore
        style={[styles.container, this.props.style]}
      >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.container.card,
    // @ts-ignore
    ...getPlatformElevation(),
  },
})
