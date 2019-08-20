import React, { PureComponent, } from "react"
import { StyleSheet, View, ViewProperties } from "react-native"
import { ApplicationStyles, } from "../themes"

export default class CardContainer extends PureComponent <ViewProperties>{
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style,]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.container.onePageCard,
    marginBottom: 60,
    alignItems: "center",
  },
})
