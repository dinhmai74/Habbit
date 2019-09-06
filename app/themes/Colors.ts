import { palette } from "./palette";

const colors = {
  background: palette.white,
  dimBg: palette.dimWhite,
  // background: "red",
  headerBackground: "#683ab7",
  linearStart: "#AA55FF",
  linearEnd: "#584BDD",
  borderColor: "#5F3CD1",
  buttonColorInColoredBackground: "#6c56b7",
  buttonColor: "#2FE57C",
  darkButtonColor: "#ACB2C4",
  greyBackground: "rgba(242,244,253,1)",
  /** date selection component colors */
  dateSelectionBackgroundInactive: "#ffffff",
  dateSelectionBackgroundActive: "#8d8d8d",
  dateButtonBorderInactive: "#ACB2C4",
  dateButtonBorderActive: "#5F3CD1",

  /** normal color */
  success: "#2FE57C",
  clear: "rgba(0,0,0,0)",
  facebook: "#3b5998",
  transparent: "rgba(0,0,0,0)",
  silver: "#F7F7F7",
  steel: "#CCCCCC",
  error: "#ed2f2f",
  ricePaper: "rgba(255,255,255, 0.75)",
  frost: "#D8D8D8",
  cloud: "rgba(200,200,200, 0.35)",
  windowTint: "rgba(0, 0, 0, 0.4)",
  panther: "#161616",
  charcoal: "#595959",
  coal: "#2d2d2d",
  bloodOrange: "#fb5f26",
  snow: "white",
  ember: "rgba(164, 0, 48, 0.5)",
  fire: "#e73536",
  drawer: "rgba(30, 30, 29, 0.95)",
  eggplant: "#251a34",
  border: palette.offWhite,
  banner: "#5F3E63",
  inActiveText: "#c3c3c3",

  authButtonColor: "#6c56b7",

  textInBackground: "#f3f3f3",
  lightGreen: "#7CFC00",
  green: "#2FE57C",
  redButton: "#BC464C",
  red: palette.red,
  white: palette.white,
  yellow: "#f1c40f",
  black: "#000000",
  darkGray: "#3F4040",
  gray: "#8d8d8d",
  lightGray: "#f3f3f3",
  bgUnmarked: "#dedede",
  bgMarked: "#b4b4b4",
  btnMarkedDisabled: "#808080",
  inActive: "#808080",
  line: "#dddddd",
  divider: palette.offWhite,
  lightRed: "#e74c3c",
  blue: "#0fbcf9",

  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  /**
   * The screen background.
   */
  linear: {
    start: palette.lightStateBlue,
    end: palette.royalBlue,
  },
  button: {
    linear: {
      start: palette.persianBlue,
      end: palette.mediumOrchid,
    },
    primaryBg: palette.pattensBlue,
    primaryText: palette.blue,
    secondaryBg: palette.white,
    secondaryText: palette.red,
  },
  text: {
    primary: palette.white,
    text: "#595959",
    label: palette.mortar,
    secondary: palette.lightStateBlue,
    third: palette.lightGrey,
    black: palette.black,
    normal: palette.concrete,
  },
  header: {
    text: {
      normal: palette.white,
      transparency: palette.orchid,
    },
    bg: {
      normal: palette.red,
      transparency: palette.white,
      linear: {
        start: "#ce9ffc",
        end: "#7367f0",
      },
    },
  },
  /**
   * The main tinting color.
   */
  primary: palette.mediumStateBlue,
  /**
   * The main tinting color, but darker.
   */
  /**
   * secondary tinting color
   */
  secondary: palette.lightStateBlue,
  primaryDarker: palette.royalBlue,
  /**
   * A subtle color used for borders and lines.
   */
  /**
   * The default color of text in many components.
   */
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  backdrop: "rgba(0,0,0,0.6)",

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
};

export default colors;
