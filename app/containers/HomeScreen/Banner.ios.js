import React, { PureComponent, } from "react"
import { Text, View, StyleSheet, } from "react-native"
import TextButton from "../../components/TextButton"
import { Colors, Metrics, } from "../../themes"

type Props = {
  value: string,
  height: number,
}

export default class Banner extends PureComponent<Props> {
  render() {
    const { value, height, } = this.props
    if (height <= 0) return null

    return (
      <TextButton
        text={value}
        style={{
          ...styles.bannerTip,
          height,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  bannerTip: {
    backgroundColor: Colors.linearStart,
    borderRadius: 3,
  },
})
