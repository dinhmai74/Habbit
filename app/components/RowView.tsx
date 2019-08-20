import React, { PureComponent, } from "react"
import { View, } from "react-native"

export default class RowView extends PureComponent {
  render() {
    return (
      <View {...this.props} style={{ flexDirection: "row", }}>
        {this.props.children}
      </View>
    )
  }
}
