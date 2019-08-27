import { StyleSheet, } from "react-native"
import Fonts from "../../themes/Fonts"
import { Colors, spacing } from '../../themes'

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing[3],
  },
  textWithIcon: {
    flexDirection: "row",
  },
  leftIcon: {
    marginLeft: spacing[3],
    alignSelf: "center",
    width: 30,
  },
  rightText: {
    alignSelf: "center",
    paddingLeft: spacing[3],
    fontFamily: Fonts.type.bold,
  },
  value: {
    marginRight: spacing[3],
    color: Colors.green,
  },
})
