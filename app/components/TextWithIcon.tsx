import React, { PureComponent } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Metrics } from "../themes";
import { AppText } from "./Text";

interface IProps {
  text?: string;
  leftIcon?: string;
  leftIconSize?: number;
  leftIconTintColor?: string;
  rightIcon?: string;
  rightIconSize?: number;
  rightIconTintColor?: string;
  onPress?: () => void;
}

export default class TextWithIcon extends PureComponent<IProps> {
  static defaultProps = {
    text: "",
    leftIcon: null,
    leftIconSize: 30,
    leftIconTintColor: null,
    rightIcon: null,
    rightIconSize: 30,
    rightIconTintColor: null,
    onPress: () => {},
  };

  render() {
    const {
      text,
      leftIcon,
      leftIconSize,
      leftIconTintColor,
      rightIcon,
      rightIconSize,
      rightIconTintColor,
    } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.props.onPress}
        style={styles.container}
      >
        {leftIcon ? (
          <Image
            // @ts-ignore
            source={leftIcon}
            style={[
              styles.icon,
              {
                width: leftIconSize,
                height: leftIconSize,
                tintColor: leftIconTintColor,
              },
            ]}
          />
        ) : null}
        <AppText>{text}</AppText>
        {rightIcon ? (
          <Image
            // @ts-ignore
            source={rightIcon}
            style={[
              styles.icon,
              {
                width: rightIconSize,
                height: rightIconSize,
                tintColor: rightIconTintColor,
              },
            ]}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    margin: Metrics.baseMargin,
    padding: 3,
  },
  icon: {
    margin: 10,
  },
});
