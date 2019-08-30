/* eslint-disable react/no-unused-prop-types */
import { View } from "native-base";
import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { ApplicationStyles, Colors, Fonts } from "../../themes";
import { getPlatformElevation } from "../../tools";

interface IProps {
  flex?: number;
  onPress?: () => void;
  text?: string;
  style?: object;
  loading?: boolean;
}

export default class AuthButton extends PureComponent<IProps> {
  static defaultProps = {
    loading: false,
  };

  render() {
    const { text, style, loading, ...rest } = this.props;

    return (
      // <TextButton
      //   textColor={Colors.white}
      //   {...this.props}
      //   style={{ ...styles.container, ...style, }}
      // />
      <View style={styles.container}>
        <Button
          loading={loading}
          title={text}
          containerStyle={{ flex: -1, ...style }}
          buttonStyle={styles.button}
          // @ts-ignore
          titleStyle={{ ...ApplicationStyles.text.textButton }}
          onPress={this.props.onPress}
          disabled={loading}
          linearGradientProps={{
            colors: [Colors.authButtonColor, Colors.authButtonColor],
            end: { x: 0.2, y: 0 },
            start: { x: 1, y: 0 },
          }}
          ViewComponent={LinearGradient} // Don't forget this!
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    height: 45,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    // shadowColor: "#000000",
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 2,
    //   width: 1,
    // },
  },
  container: {
    // @ts-ignore
    ...getPlatformElevation(2),
  },
});
