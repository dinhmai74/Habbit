import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { spacing } from "./spacing";

const { width, height } = Dimensions.get("window");
const statusBarHeight = getStatusBarHeight();

// based on iphone 5s's scale
// Use iPhone8 1x as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);
export const scaledSize = (size: number) => Math.ceil(size * scale);

export const screen = { height, width };

const metrics = {
  icon: {
    normal: 24,
    small: 18,
    big: 32,
  },
  logo: {
    small: 100,
    small2: 150,
    normal: 200,
  },
  screen,
  marginHorizontal: spacing[2],
  marginVertical: spacing[2],
  section: spacing[5],
  baseMargin: spacing[2],
  doubleBaseMargin: spacing[2] * 2,
  tripleBaseMargin: spacing[2] * 3,
  sidesPadding: spacing[5],
  smallMargin: spacing[1],
  tinyMargin: spacing[1] / 2,
  doubleSection: spacing[8],
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  buttonPadding: 10,
  statusBarHeight,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
  buttonRadius: 5,
  circleButtonRadius: 30,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logoWidth: width * 0.6,
    logoHeight: width * 0.7,
    smallLogoWidth: width * 0.25,
    smallLogoHeight: (width * 0.25) / 2.3,
  },
  text: {},
  googleLogiButtonWidth: 124,
  googleLogiButtonHeight: 44,
};

export default metrics;
