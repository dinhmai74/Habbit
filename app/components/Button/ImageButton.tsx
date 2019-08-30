/* eslint-disable react/prop-types */
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "app/themes";

const ImageButton = ({ icon, style, size, tintColor, pressed = () => {} }) => (
  <TouchableOpacity
    hitSlop={{
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    }}
    style={{ ...style, width: size, height: size }}
    onPress={pressed}
  >
    {icon !== undefined ? (
      <Image
        source={icon}
        style={{ ...styles.customize, width: size, height: size, tintColor }}
      />
    ) : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  customize: {
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: Colors.white,
  },
});

export default ImageButton;
