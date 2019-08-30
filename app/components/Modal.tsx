import { Text as NativebaseText } from "native-base";
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EditTaskLine from "./EditTaskLine";

import { Colors, Fonts, strings } from "../themes";
import { InlineDecorationText } from "./Text";

const checkIcon = <FontAwesome5 name="check" size={20} color={Colors.green} />;
const searchIcon = (
  <FontAwesome5 name="search" size={20} color={Colors.yellow} />
);
const undoIcon = (
  <FontAwesome5 name="undo" size={20} color={Colors.linearStart} />
);
const rightIcon = (
  <FontAwesome5 name="caret-right" size={20} color={Colors.bloodOrange} />
);

interface IProps {
  habitCardProp: any;
  contentStyle: StyleSheetProperties;
  undoOnModal: any;
  status: any;
  viewDetail: () => void;
}

export default class ModalTask extends Component<IProps> {
  state = {
    visibleModal: false,
  };

  viewDetail = () => {
    this.props.viewDetail();
    this.setState({ visibleModal: false });
  };

  undo = () => {
    const { taskId, taskDate, updateTaskStatus } = this.props.habitCardProp;
    this.props.undoOnModal(taskId, "spending", taskDate);
  };

  renderEditTaskLine = () => {
    if (this.props.status === "done") {
      return (
        <EditTaskLine
          leftIcon={undoIcon}
          // @ts-ignore
          content="Undo"
          rightIcon={rightIcon}
          styles={styles}
          onPress={() => this.undo()}
        />
      );
    }
    if (this.props.status === "skipped") {
      return (
        <EditTaskLine
          leftIcon={undoIcon}
          // @ts-ignore
          content="Undo"
          rightIcon={rightIcon}
          styles={styles}
          onPress={() => this.undo()}
        />
      );
    }
  };

  renderModalContent = () => (
    <View style={[styles.modalContent, this.props.contentStyle]}>
      <Text style={[styles.title, { paddingBottom: 10 }]}>I would like to</Text>
      <EditTaskLine
        leftIcon={searchIcon}
        // @ts-ignore
        content="View details"
        rightIcon={rightIcon}
        styles={styles}
        onPress={() => this.viewDetail()}
      />
      {this.renderEditTaskLine()}

      <TouchableOpacity onPress={this.closeModal}>
        <NativebaseText style={styles.subTitleText}>
          None of these
        </NativebaseText>
      </TouchableOpacity>
    </View>
  );

  showModal = () => this.setState({ visibleModal: true });

  closeModal = () => {
    this.setState({
      visibleModal: false,
    });
  };

  render() {
    return (
      <Modal
        isVisible={this.state.visibleModal}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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
    marginLeft: 70,
    marginRight: 70,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#000000",
    // @ts-ignore
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    paddingBottom: 7,
    paddingTop: 7,
  },
  textWithIcon: {
    flexDirection: "row",
  },
  leftIcon: {
    alignSelf: "center",
    width: 20,
  },
  rightText: {
    alignSelf: "center",
    color: Colors.eggplant,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    paddingRight: 10,
    paddingLeft: 5,
  },
  rightIcon: {
    color: Colors.textInBackground,
  },
  title: {
    color: Colors.facebook,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
  },
  subTitleText: {
    textDecorationLine: "underline",
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    color: Colors.facebook,
  },
});
