import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics, spacing } from "../../themes";
import { getPlatformElevation } from "tools";
const size = 40;

export default StyleSheet.create({
  socialContainer: {
    flex: 2,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    ...getPlatformElevation(),
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[7],
    margin: spacing[2],
  },
});
