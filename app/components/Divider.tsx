import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../themes";

interface IProps {
  style?: object;
  color?: string;
}

export default class AppDivider extends PureComponent<IProps> {
  static defaultProps = {
    color: null,
    style: null,
  };

  render() {
    return (
      <View
        style={[
          styles.divider,
          this.props.style,
          { backgroundColor: this.props.color || Colors.divider },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
