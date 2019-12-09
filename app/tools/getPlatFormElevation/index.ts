import { Platform } from "react-native";

/* eslint-enable import/no-unresolved, import/extensions */

export const getPlatformElevation = (elevation: number = 1) => {
  if (Platform.OS === "android") {
    return { elevation };
  }

  if (elevation === 0) {
    return {
      shadowColor: "transparent",
      zIndex: 0,
    };
  }

  return {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    // we need to have zIndex on iOS, otherwise the shadow is under components that
    // are rendered later
  };
};
