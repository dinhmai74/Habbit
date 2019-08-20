import { StyleSheet, } from "react-native"
import Fonts from "../../themes/Fonts"
import { Colors, } from "../../themes"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    margin: 10,
  },
  textWithIcon: {
    flexDirection: "row",
  },
  leftIcon: {
    marginLeft: 20,
    alignSelf: "center",
    width: 40,
  },
  rightText: {
    alignSelf: "center",
    paddingLeft: 20,
    fontFamily: Fonts.type.bold,
  },
  value: {
    marginRight: 20,
    color: Colors.green,
  },
})
