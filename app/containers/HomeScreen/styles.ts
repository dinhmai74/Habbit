import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import { Colors, Metrics } from "../../themes";
import { getPlatformElevation } from "../../tools";

export const HEADER_MAX_HEIGHT = 200;

export default StyleSheet.create({
  container: {},

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  button: {
    position: "absolute",
    zIndex: 99,
    bottom: "10%",
    right: 10,
    // @ts-ignore
    ...getPlatformElevation(),
  },
  bannerTip: {
    backgroundColor: Colors.linearStart,
    borderRadius: 3,
  },
  inLineTip: {},
  card: { marginBottom: 15 },
  bottomDateSelection: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export const Content = styled(View)`
  margin: 10px;
`;

export const CardContainer = styled(View)``;
