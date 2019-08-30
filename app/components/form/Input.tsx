// @ts-nocheck
import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProperties,
  View,
} from "react-native";
import { Input as ElementInput } from "react-native-elements";

import { ApplicationStyles, Colors } from "../../themes";
import { getStyleFromProps } from "../../tools";
import { AppText } from "../Text";

interface IProps {
  label?: string;
  value?: string;
  marginTop?: number;
  isError?: boolean;
  secureTextEntry?: boolean;
  icon?: any;
  onFocus?: () => void;
}

// Distance label top with input container default
const LABEL_DEFAULT_TOP = 15;
const LABEL_DEFAULT_TOP_FOCUS = -5;

// Label size when animated
const LABEL_FONT_SIZE = 14;
const LABEL_FONT_SIZE_FOCUS = 16;

export default class Input extends Component<IProps & TextInputProperties> {
  static defaultProps = {
    onFocus: () => {},
  };

  state = {
    labelPositionTop: new Animated.Value(LABEL_DEFAULT_TOP),
    labelFontSize: new Animated.Value(14),
  };
  refInput: any;

  handleFocus = () => {
    Animated.timing(this.state.labelPositionTop, {
      toValue: LABEL_DEFAULT_TOP_FOCUS,
      duration: 300,
    }).start();
    Animated.timing(this.state.labelFontSize, {
      toValue: LABEL_FONT_SIZE_FOCUS,
      duration: 300,
    }).start();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    if (!this.props.value) {
      Animated.timing(this.state.labelPositionTop, {
        toValue: LABEL_DEFAULT_TOP,
        duration: 300,
      }).start();
      Animated.timing(this.state.labelFontSize, {
        toValue: LABEL_FONT_SIZE,
        duration: 400,
      }).start();
    }
  };

  focus = () => {
    if (this.refInput) {
      this.refInput.focus();
    }
  };

  renderLabel = () => {
    const { isError } = this.props;

    const color = isError ? Colors.error : Colors.white;

    const styleLabelContainer = {
      ...styleInput(color).labelContainer,
      top: this.state.labelPositionTop,
    };
    const styleLabel = {
      ...styleInput(color).label,
      fontSize: this.state.labelFontSize,
    };
    return (
      <Animated.View style={styleLabelContainer}>
        <AppText>
          <Animated.Text style={styleLabel}>{this.props.label}</Animated.Text>
        </AppText>
      </Animated.View>
    );
  };

  renderInputText = () => {
    const { isError } = this.props;

    const color = isError ? Colors.error : Colors.white;
    return (
      <TextInput
        {...this.props}
        // eslint-disable-next-line no-return-assign
        ref={c => (this.refInput = c)}
        value={this.props.value}
        style={styleInput(color).input}
        onFocus={this.handleFocus.bind(this)}
        autoCapitalize="none"
        onBlur={this.handleBlur.bind(this)}
        // @ts-ignore
        onChangeText={this.props.onChange}
        secureTextEntry={this.props.secureTextEntry}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
    );
  };

  renderLabelInputCombine() {
    const { isError } = this.props;
    const color = isError ? Colors.error : Colors.white;

    const styleInputContainer = [
      styleInput(color).inputContainer,
      // @ts-ignore
      getStyleFromProps(["marginTop"], this.props),
    ];
    return (
      <View style={styleInputContainer}>
        {this.renderLabel()}
        {this.renderInputText()}
        {this.renderLineWhite()}
      </View>
    );
  }

  renderLineWhite = () => {
    const { isError } = this.props;
    const color = isError ? Colors.error : Colors.white;
    return <View style={styleInput(color).lineWhite} />;
  };

  renderInputWithIcon() {
    const { isError } = this.props;
    const color = isError ? Colors.error : Colors.white;
    return (
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ width: 40, marginRight: 5, marginBottom: 2 }}>
          {// @ts-ignore
          React.cloneElement(this.props.icon, {
            color,
            size: 25,
          })}
        </View>
        <View style={{ flex: 1 }}>{this.renderLabelInputCombine()}</View>
      </View>
    );
  }

  render() {
    // @ts-ignore
    if (this.props.icon) {
      return this.renderInputWithIcon();
    }
    return this.renderLabelInputCombine();
  }
}

const styleInput = (color = "#fff") => {
  return {
    inputContainer: {
      position: "relative",
      height: 51,
      justifyContent: "flex-end",
    },
    labelContainer: {
      position: "absolute",
      top: 100,
    },
    label: {
      color,
      fontSize: 14,
      letterSpacing: 0.9,
    },
    lineWhite: {
      height: 2,
      backgroundColor: color,
      opacity: 0.51,
    },
    input: {
      ...ApplicationStyles.text.textInput.base,
      height: 40,
      color,
      borderWidth: 0,
      borderColor: "transparent",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    },
  };
};
