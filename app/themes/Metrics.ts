import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('window')
const statusBarHeight = getStatusBarHeight()

export const screen = { height, width }

const metrics = {
  icon: {
    normal: 24,
    small: 18,
    big: 32,
  },
  logo: {
    small: 100,
    normal: 200,
  },
  screen,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  tripleBaseMargin: 30,
  sidesPadding: 20,
  smallMargin: 5,
  tinyMargin: 3,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  buttonPadding: 10,
  statusBarHeight,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
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
}

export default metrics
