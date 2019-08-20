import React, { PureComponent, } from "react"
import { Text, View, StyleSheet, } from "react-native"
import { TextButton, } from "../../components"
import { Colors, Metrics, } from "../../themes"

type Props = {
  value: string,
  height: number,
}

export default class Banner extends PureComponent<Props> {
  render() {
    const { value, height, } = this.props
    const hide = { position: "absolute", left: 1000, }
    const show = { position: "relative", left: 0, }
    const styleBanner = height <= 0 ? hide : show
    return (
      <TextButton
        text={value}
        style={{
          ...styles.bannerTip,
          height,
          ...styleBanner,
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
