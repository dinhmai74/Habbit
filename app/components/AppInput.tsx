import { presets } from "app/components/Text/text.presets";
import AppI18n from "app/localization";
import { TranslateKey } from "app/localization/languages";
import { Colors, palette, spacing } from "app/themes";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { mergeAll, flatten } from "ramda";
import { GoogleSigninButton } from "react-native-google-signin";
import { Sae } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

interface Props  {
  height?: number;
  /*
   * active border height
   */
  borderHeight?: number;
  /*
   * This is the icon component you are importing from react-native-vector-icons.
   * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
   * iconClass={FontAwesomeIcon}
   */
  iconClass?: any;
  /*
   * Passed to react-native-vector-icons library as name prop
   */
  iconName?: string;
  /*
   * Passed to react-native-vector-icons library as color prop.
   * This is also used as border color.
   */
  iconColor?: string;
  inputPadding?: number;
  inputStyle?: any;
  label: TranslateKey;
  labelStyle?: any;
  labelHeight?: number;

  [rest: string]: any;
}

export class AppInput extends Component<Props> {
  static defaultProps = {
    iconColor: palette.mortar,
    borderHeight: 1,
    // TextInput props
    autoCapitalize: "none",
    autoCorrect: false,
    labelHeight: 24,
    inputPadding: 16,
    iconClass: FontAwesomeIcon,
    iconName: "pencil",
  };
  render() {
    const {
      label: inputLabel,
      labelStyle: labelStyleOverride,
      inputStyle: inputOverride,
      iconColor: iconColorOverride,
      ...rest
    } = this.props;
    const label = AppI18n.t(inputLabel);
    const inputStyle = mergeAll(
      flatten([
        presets.textInput,
        { color: Colors.text.text, paddingBottom: spacing[2] },
        inputOverride,
      ])
    );
    const labelStyle = mergeAll(
      flatten([
        presets.fieldLabel,
        labelStyleOverride,
      ])
    );

    let iconColor = iconColorOverride;
    if (!iconColor) {
      iconColor = palette.mortar;
    }

    return (
      <Sae
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        iconColor={iconColor}
        label={label}
        {...rest}
      />
    );
  }
}

export default AppInput;
