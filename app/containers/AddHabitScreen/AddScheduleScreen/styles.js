import { StyleSheet, } from "react-native"
import { ApplicationStyles, Fonts, Metrics, Colors, } from "../../../themes"
import metrics from "../../../themes/Metrics"

export default StyleSheet.create({
  container: {
    padding: Metrics.sidesPadding,
    width: "100%",
  },
  title: {
    ...ApplicationStyles.text.titleText,
    alignSelf: "center",
    textAlign: "center",
    fontSize: Fonts.size.regular,
  },
  buttonText: {
    color: Colors.white,
    padding: 5,
    fontFamily: Fonts.type.bold,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
})
