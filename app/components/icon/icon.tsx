import flatten from "ramda/es/flatten";
import mergeAll from "ramda/es/mergeAll";
import * as React from "react";
import { Image, ImageStyle, View } from "react-native";
import { IconProps } from "./icon.props";
import { icons } from "./icons";
import { Metrics } from "../../themes";

const ROOT: ImageStyle = {
  resizeMode: "contain",
  backgroundColor: "transparent",
};

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, size, bg, color, containerStyle } = props;
  const imageSize = size || Metrics.icon.normal;
  const sizeImage = { width: imageSize, height: imageSize };
  const bgImage = bg && { backgroundColor: bg };
  const colorImage = color && { tintColor: color };

  // @ts-ignore
  const style: ImageStyle = mergeAll(
    flatten([ROOT, sizeImage, colorImage, styleOverride])
  );

  return (
    // @ts-ignore
    <View style={[bgImage, containerStyle]}>
      <Image
        style={style}
        // @ts-ignore
        source={icons[icon]}
      />
    </View>
  );
}
