import Fonts, { FontTypes } from "app/themes/Fonts";
import { NativeBase } from "native-base";
import React from "react";
import { TextStyle } from "react-native";
import { normalize } from "react-native-elements";
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
  // 38
  h1?: boolean;
  // 34
  h2?: boolean;
  // 30
  h3?: boolean;
  // 26
  h4?: boolean;
  // 21
  h5?: boolean;
  // 19
  h6?: boolean;
  /**
   * or subtitle?
   */
  // 18
  s1?: boolean;
  // 16
  s2?: boolean;
  /*
   * or paragrahp. default text is paragrahp
   */
  // p1: normalize(17),
  p1?: boolean;
  // p2: normalize(15),
  p2?: boolean;
  // p3: normalize(13),
  p3?: boolean;
  // p4: normalize(11),
  p4?: boolean;

  /*
   * or caption?
   */
  // c1: normalize(20),
  c1?: boolean;
  // c2: normalize(18),
  c2?: boolean;
  /**
   * or a text label
   * label: normalize(20),
   */
  label?: boolean;

  /**
   * bold?
   */

  bold?: boolean;

  /**
   * Text which is looked up via i18n.
   */
  tx?: string | number;

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object;

  // size of text
  size?: number;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | number;

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
