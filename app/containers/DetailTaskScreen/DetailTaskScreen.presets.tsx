import { Colors, Fonts, Metrics } from "app/themes";
import { getPlatformElevation } from "app/tools";
import React from "react";
import { StyleSheet } from "react-native";
import FontEntypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

const size = Metrics.icon.normal;

export const rightArrowIcon = (
  <FontEntypo
    name="chevron-thin-right"
    size={size}
    color={Colors.buttonColor}
  />
);
export const pencilIcon = (
  <FontEntypo name="edit" size={size} color={Colors.linearStart} />
);
export const scheduleIcon = (
  <FontEntypo name="clock" size={size} color={Colors.bloodOrange} />
);
export const removeIcon = (
  <Material name="delete" size={size} color={Colors.fire} />
);
export const statsIcon = (
  <Ionicons name="ios-stats" size={size} color={Colors.green} />
);

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: Colors.white,
    ...getPlatformElevation(),
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
    margin: 10,
    fontFamily: Fonts.type.bold,
  },
  rightIcon: {
    color: Colors.textInBackground,
  },
  viewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
  },
  subTitleText: {
    textDecorationLine: "underline",
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    color: Colors.facebook,
    paddingTop: 30,
  },
  title: {
    color: Colors.facebook,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.input,
  },
});
