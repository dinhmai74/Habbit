import { StyleSheet, } from "react-native"
import { Colors, Metrics, Fonts, } from "../../themes"

export default StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20,
  },
  separator: {
    padding: 10,
    paddingLeft: Metrics.sidesPadding,
    paddingRight: Metrics.sidesPadding,
    ...Fonts.style.smallBold,
  },
  cardItem: {
    width: "100%",
  },
  groupContainer: {},
  groupContent: {
    backgroundColor: Colors.white,
    padding: 10,
  },
  item: {
    marginTop: 10,
    paddingLeft: Metrics.sidesPadding,
    paddingRight: Metrics.sidesPadding,
  },
})
