// @ts-nocheck
import { Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../themes";
import { AppText } from "../Text";

interface IProps {
  textHelper: string;
  textAction: string;
  onPressAction: () => void;
  notFloat?: boolean;
  style?: object;
}

export default class AlertStatus extends Component<IProps> {
  render() {
    const { notFloat } = this.props;
    return (
      <View
        style={[
          style.container,
          { position: notFloat ? "relative" : "absolute" },
          this.props.style,
        ]}
      >
        <Text>
          <Text style={[style.text]}>
            {this.props.textHelper}
            {"? "}
          </Text>

          <Text
            // @ts-ignore
            onPress={this.props.onPressAction}
            style={[style.text, style.actionText]}
          >
            {this.props.textAction}
          </Text>
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(139, 113, 227, 0.6)",
    width: "100%",
    padding: 10,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  text: {
    color: Colors.white,
  },
});
