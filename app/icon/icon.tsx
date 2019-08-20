import flatten from "ramda/es/flatten"
import mergeAll from "ramda/es/mergeAll"
import * as React from "react"
import { Image, ImageStyle, View } from "react-native"
import { metrics } from "../../theme/metrics"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, size, bg, color, containerStyle } = props
  const imageSize = size || metrics.icon.normal
  const sizeImage = { width: imageSize, height: imageSize }
  const bgImage = bg && { backgroundColor: bg }
  const colorImage = color && { tintColor: color }

  const style: ImageStyle = mergeAll(flatten([ROOT, sizeImage, colorImage, styleOverride]))

  return (
    <View style={[bgImage, containerStyle]}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
