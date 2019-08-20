import { StyleSheet, } from "react-native"
import { Metrics, Colors, Fonts, } from "../../themes"

export default StyleSheet.create({
  contentContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    margin: Metrics.sidesPadding,
  },
  appHeader: {
    paddingBottom: 0,
  },
  writeYourOwnRow: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  icon: {
    margin: Metrics.baseMargin,
  },
  text: {
    width: "100%",
    margin: Metrics.baseMargin,
  },

  flatList: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 10,
    marginRight: 10,
  },
  textWithIcon: {
    flexDirection: "row",
    paddingRight: 120,
  },
  leftIcon: {
    marginLeft: 20,
    alignSelf: "center",
    width: 40,
  },
  rightText: {
    alignSelf: "center",
    paddingLeft: 20,
    color: Colors.panther,
    fontFamily: Fonts.type.bold,
  },
  rightIcon: {
    paddingLeft: 13,
    color: Colors.panther,
  },
})
