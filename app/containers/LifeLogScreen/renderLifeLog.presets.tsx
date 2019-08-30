import { BorderCard } from "app/components";
import { Colors, Fonts, spacing } from "app/themes";
import { StyleSheet } from "react-native";
import { Row } from "react-native-easy-grid";
import styled from "styled-components";

export const StyledRow = styled(Row)`
  flex-direction: row;
  padding: ${spacing[2]}px ${spacing[0]}px;
  background: ${Colors.white};
`;

export const StyledBorderCard = styled(BorderCard)`
  padding: ${spacing[0]}px ${spacing[0]}px;
`;

export const CenterContentRow = styled(Row)`
  align-items: center;
`;

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: "100%",
    height: 60,
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
  },
  title: {
    color: Colors.facebook,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h6,
    paddingBottom: 20,
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    textAlign: "center",
    paddingBottom: 20,
  },
});
