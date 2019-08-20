import React, { Component, } from "react"
import { View, } from "react-native"
import { Text, } from "native-base"
import styles from "./styles"
import Fonts from "../../themes/Fonts"
import { CardItem, } from "../form"

export default class LineLog extends Component {
  render() {
    const { icon, content, value, } = this.props
    return (
      <CardItem style={styles.container}>
        <View style={styles.textWithIcon}>
          <Text style={styles.leftIcon}>{icon}</Text>
          <Text style={[styles.rightText, Fonts.style.normal,]}>{content}</Text>
        </View>
        <Text style={[Fonts.style.normal, styles.value,]}>{value}</Text>
      </CardItem>
    )
  }
}
