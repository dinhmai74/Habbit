import { presets } from "app/components/Text/text.presets";
import { Fonts } from "app/themes/index";
import { normalize } from "react-native-elements";

const type = {
  base: "Montserrat-Regular",
  black: "Montserrat-Black",
  blackItalic: "Montserrat-BlackItalic",
  bold: "Montserrat-Bold",
  boldItalic: "Montserrat-BoldItalic",
  extraBold: "Montserrat-ExtraBold",
  extraBoldItalic: "Montserrat-ExtraBoldItalic",
  extraLight: "Montserrat-ExtraLight",
  extraLightItalic: "Montserrat-ExtraLightItalic",
  italic: "Montserrat-Italic",
  light: "Montserrat-Light",
  lightItalic: "Montserrat-LightItalic",
  medium: "Montserrat-Medium",
  mediumItalic: "Montserrat-MediumItalic",
  semiBold: "Montserrat-SemiBold",
  semiBoldItalic: "Montserrat-SemiBoldItalic",
  thin: "Montserrat-Thin",
  thinItalic: "Montserrat-ThinItalic",
};

export type FontTypes = keyof typeof type;

const size = {
  h1: normalize(38),
  h2: normalize(34),
  h3: normalize(30),
  h4: normalize(26),
  h5: normalize(21),
  h6: normalize(19),
  s1: normalize(18),
  s2: normalize(16),
  c1: normalize(20),
  c2: normalize(18),
  label: normalize(20),
  p1: normalize(17),
  p2: normalize(17),
  input: normalize(17),
  base: normalize(15),
  regular: normalize(16),
  medium: normalize(14),
  small: normalize(12),
  tiny: normalize(8.5),
  numPad: normalize(24),
  button: normalize(20),
  instructionTitle: normalize(22),
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: type.base,
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h5Bold: {
    fontFamily: type.bold,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6,
  },
  h6Bold: {
    fontFamily: type.bold,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  normalBold: {
    fontFamily: type.bold,
    fontSize: size.regular,
  },
  instructionTitle: {
    fontFamily: type.base,
    fontSize: size.instructionTitle,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  descriptionBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
  },
  textInput: {
    fontFamily: type.base,
    fontSize: size.input,
  },
  numPad: {
    fontFamily: type.base,
    fontSize: size.numPad,
  },
  button: {
    fontFamily: type.base,
    fontSize: size.button,
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
  },
  smallBold: {
    fontFamily: type.bold,
    fontSize: size.small,
  },
};

export type FontStyles = keyof typeof style;

export default {
  type,
  size,
  style,
};
