import React, { PureComponent } from "react";
import { View, ViewStyle } from "react-native";

interface Props {
  style?: ViewStyle;
}

export class RowView extends PureComponent<Props> {
  render() {
    const { style } = this.props;
    return (
      <View {...this.props} style={{ flexDirection: "row", ...style }}>
        {this.props.children}
      </View>
    );
  }
}

export default RowView;
