import { TextStyle, ViewStyle } from "react-native";
import { IconType } from "react-native-elements";
import { NavigationInjectedProps } from "react-navigation";
import { IconTypes } from "../icon";

export interface IHeaderProps extends NavigationInjectedProps {
  /**
   * Main header, e.g. POWERED BY BOWSER
   */
  headerTx?: string;

  /**
   * header non-i18n
   */
  headerText?: string;
  /**
   * header text by component
   */
  headerTextComponent?: JSX.Element;

  leftIcon?: IconTypes | JSX.Element | "close";

  leftIconFontFamily?: IconType;

  leftIconFontSize?: number;

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes | JSX.Element;

  rightIconFontFamily?: IconType;

  rightIconFontSize?: number;
  /**
   * Container style overrides.
   */
  style?: ViewStyle;

  /**
   * Title style overrides.
   */
  titleStyle?: TextStyle;
  /**
   *
   * your header type : transparent or red background
   */
  type: "normal" | "transparent";

  /**
   * middle text: the middle text appear in normal header, under title and right icon
   */
  middleTitle?: string;
  /**
   * middle text: the middle text appear in normal header, under title and right icon
   */
  middleSubtitle?: string;

  /**
   * header background height
   */
  height?: number;

  /**
   * the bottom border radius
   */
  bottomBorderRadius?: number;

  /*
  color for the content
   */
  color?: string;

  hasDivider?: boolean;

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void;

  onLeftPress?(): void;
}
