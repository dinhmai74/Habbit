// @flow

import {
  Button,
  Content as NativeBaseContent,
  H2,
  Header as NativeHeader,
  Icon,
  Row as NativeRow,
  Text,
} from "native-base";
import React, { PureComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import I18n from "../../../localization";

import { Colors, Metrics, strings } from "../../../themes";
import { capitalize } from "../../../tools";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: Metrics.screenHeight * 0.7,
    width: Metrics.screenWidth * 0.9,
  },
  text: {
    color: Colors.white,
  },
  icon: {
    color: Colors.white,
    padding: 5,
  },
  swipeRightIcon: {
    backgroundColor: Colors.success,
  },
  swipeLeftIcon: {
    backgroundColor: Colors.buttonColorInColoredBackground,
    alignSelf: "flex-end",
  },
  touchIcon: { color: Colors.yellow, padding: 10 },
  instructionText: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    alignSelf: "center",
    margin: 20,
    bottom: 0,
  },
});
interface IProps {
  // eslint-disable-next-line react/require-default-props
  buttonOnPress: () => void;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  isVisible?: boolean;
}

export default class Instructions extends PureComponent<IProps> {
  static defaultProps = {
    buttonOnPress: () => {},
    onBackdropPress: () => {},
    onBackButtonPress: () => {},
  };

  render() {
    const { ...rest } = this.props;
    let animationIn = "fadeIn";
    let animationOut = "fadeOut";
    const animTime = 500;

    if (Platform.OS === "android") {
      animationIn = "slideInUp";
      animationOut = "slideOutDown";
    }
    return (
      // @ts-ignore
      <Modal
        {...rest}
        backdropColor="rgba(172,172,172, 0.6)"
        backdropTransitionOutTiming={230}
        animationIn={animationIn}
        animationOut={animationOut}
        animationOutTiming={animTime}
        animationInTiming={animTime}
        deviceWidth={Metrics.screenWidth}
        deviceHeight={Metrics.screenHeight}
      >
        <View style={styles.container}>
          <Header>
            <H2 style={[styles.text]}>
              {capitalize(I18n.t(strings.titleInstructions))}
            </H2>
          </Header>

          <Content>
            <Row>
              <Icon
                name="refresh"
                type="MaterialCommunityIcons"
                style={[styles.touchIcon]}
              />
              <Text style={styles.instructionText}>
                {capitalize(I18n.t(strings.textPullToRefresh))}
              </Text>
            </Row>
            <Row>
              <Icon
                name="arrow-right"
                type="MaterialCommunityIcons"
                style={[styles.icon, styles.swipeRightIcon]}
              />
              <Text style={styles.instructionText}>
                {capitalize(I18n.t(strings.textSwipeRightForDone))}
              </Text>
            </Row>

            <Row>
              <Text style={styles.instructionText}>
                {capitalize(I18n.t(strings.textSwipeLeftToSkip))}
              </Text>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Icon
                  name="arrow-left"
                  type="MaterialCommunityIcons"
                  style={[styles.icon, styles.swipeLeftIcon]}
                />
              </View>
            </Row>

            <Row style={{ justifyContent: "center" }}>
              <Icon
                name="touch-app"
                type="MaterialIcons"
                style={[styles.touchIcon]}
              />
              <Text style={styles.instructionText}>
                {capitalize(I18n.t(strings.textTapForDetail))}
              </Text>
            </Row>
          </Content>
          <Button
            bordered
            rounded
            style={styles.button}
            onPress={this.props.buttonOnPress}
          >
            <Text>{capitalize(I18n.t(strings.textOkIUnderStand))}</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const Header = styled(View)`
  background: ${Colors.authButtonColor};
  align-items: center;
  padding: 25px 15px;
  width: 100%;
`;
const Content = styled(NativeBaseContent)`
  padding: 10px;
  margin: 20px 0px;
`;
const Row = styled(NativeRow)`
  background: ${Colors.white};
  align-items: center;
  margin: 10px;
`;
