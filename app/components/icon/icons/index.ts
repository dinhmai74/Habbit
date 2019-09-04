import { Images } from "../../../themes";

export const icons = {
  back: require("../../../images/ic_back.png"),
  close: Images.iconClose,
  bullet: require("./bullet.png"),
  logoWithText: require("./logo-with-text.png"),
  logoColored: require("./main-logo-colored-with-text.png"),
  logo: require("./with-out-text.png"),
  bottomImage: require("./bottom-image.png"),
  bottomColoredImage: require("./coloredBg.jpg"),
  headerMap: require("./header-map.png"),
  history: require("./icons8-order_history.png"),
  setting: require("./icon-setting.png"),
  home: require("../../../images/icon-home.png"),
  sun: require("./icons8-happy.png"),
  moon: require("./icons8-bright_moon.png"),
  cloud: require("./icons8-sun.png"),
};

export type IconTypes = keyof typeof icons;
