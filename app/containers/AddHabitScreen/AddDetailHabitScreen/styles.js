import { StyleSheet, } from "react-native"
import { Colors, Fonts, } from "../../../themes"
import metrics from "../../../themes/Metrics"

export default StyleSheet.create({
  container: {},
  contentContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    margin: metrics.sidesPadding,
    marginBottom: 25,
  },
  text: {
    textAlign: "center",
    fontFamily: Fonts.type.base,
    color: Colors.panther,
    fontSize: Fonts.size.regular,
  },
  InlineDecorationText: {
    margin: 10,
  },
})
