import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewProperties,
} from "react-native";

import { Text } from "native-base";
import Colors from "../themes/Colors";
import Fonts from "../themes/Fonts";

interface IProps {
  content: string;
  rightIcon: any;
  leftIcon: any;
  styles: any;
}

export default class EditTaskLine extends Component<
  TouchableOpacityProperties & ViewProperties & IProps
> {
  render() {
    const { styles } = this.props;
    return (
      // @ts-ignore
      <TouchableOpacity
        underlayColor={Colors.borderColor}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          <View style={styles.textWithIcon}>
            <Text style={styles.leftIcon}>{this.props.leftIcon}</Text>
            <Text style={[styles.rightText, Fonts.style.normal]}>
              {this.props.content}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
            <Text style={[Fonts.style.normal, styles.rightIcon]}>
              {this.props.rightIcon}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
