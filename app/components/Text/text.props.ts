import Fonts, { FontTypes } from "app/themes/Fonts";
import { NativeBase } from "native-base";
import React from "react";
import { TextStyle } from "react-native";
import { TextPresets } from "./text.presets";

// tslint:disable-next-line: interface-name
export interface TextProps extends NativeBase.Text {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /*
   * is that title?
   */
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  /**
   * or subtitle?
   */
  s1?: boolean;
  s2?: boolean;
  /*
   * or paragrahp. default text is paragrahp
   */
  p1?: boolean;
  p2?: boolean;

  /*
   * or caption?
   */
  c1?: boolean;
  c2?: boolean;
  /**
   * or a text label
   */
  label?: boolean;

  /**
   * bold?
   */

  bold?: boolean;

  /**
   * Text which is looked up via i18n.
   */
  tx?: string;

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets;

  /*
   * font type
   */
  fontType?: FontTypes;

  /**
   * color of text
   */
  color?: string;
}
