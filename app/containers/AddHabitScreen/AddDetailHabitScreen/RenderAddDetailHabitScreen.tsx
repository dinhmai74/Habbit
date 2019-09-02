// @flow
import { editTaskIconAndName, fetchTasks } from "app/appRedux";
import {
  IconAndNameModel,
  IconDisplayModel,
  TaskFormattedModel,
} from "app/model";
import NavigateService from "app/tools/NavigateService";
import { Content } from "native-base";
import React, { Component } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "react-native-firebase";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import {
  AppBackground,
  AppHeader,
  InlineDecorationText,
  Text,
  ToastService,
} from "../../../components";
import I18n from "../../../localization";

import dataIcon from "../../../model/icon.json";
import { Colors, strings } from "../../../themes";
import { capitalize, today } from "../../../tools";
import HabitInput from "./components/HabitInput";
import styles from "./styles";

interface IProps extends NavigationInjectedProps {
  onNextScreen: Function;
  titleHobbie?: string;

  [anther: string]: any;
}

interface IState {
  textHabit: string;
  timeDuration: number;
  colorIcon: string;
  iconName: string;
  createdDate: string;

  [anotherState: string]: any;
}

class RenderAddDetailHabitScreen extends Component<IProps, IState> {
  state = {
    taskId: "",
    textHabit: "",
    timeDuration: 20,
    colorIcon: dataIcon.color[0],
    iconName: dataIcon.icon[0].name,
    colorHightLight: dataIcon.color[0],
    iconHightLight: dataIcon.icon[0].name,
    createdDate: today,
    type: "add",
    item: null,
  };

  componentDidMount() {
    const { item, type } = this.props;
    if (item && type) {
      const { icon } = item;
      this.setState({
        type,
        taskId: item.id,
        colorIcon: icon.color,
        colorHightLight: icon.color,
        iconHightLight: icon.name,
        iconName: icon.name,
        textHabit: item.quest,
        item,
      });
    }
  }

  componentWillMount() {
    if (this.props.titleHobbie) {
      this.setState({ textHabit: this.props.titleHobbie });
    }
  }

  componentWillUpdate() {}

  onChangeInput = (text: string, type: string): void => {
    this.setState({
      [type]: text,
    });
  };

  rightTitleOnClick = async () => {
    const { type } = this.state;
    if (type === "add") {
      this.onNextInAddMode();
    } else {
      this.sendEditIconRequest();
    }
  };

  sendEditIconRequest = async () => {
    const { textHabit: quest, colorIcon, iconName, taskId } = this.state;
    const icon: IconDisplayModel = {
      name: iconName,
      color: colorIcon,
    };

    if (!quest) {
      ToastService.showToast(
        I18n.t(strings.errMessYourHabitQuestIsEmpty),
        "danger"
      );
      return;
    }

    if (!icon) {
      ToastService.showToast(
        I18n.t(strings.errMessPleaseChoseYourIcon),
        "danger"
      );
      return;
    } else {
      if (!icon.name || !icon.color) {
        ToastService.showToast(
          I18n.t(strings.errMessPleaseChoseYourIcon),
          "danger"
        );
        return;
      }
    }
    const user = await firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      const { item } = this.state;
      if (item) {
        // @ts-ignore
        item.quest = quest;
        // @ts-ignore
        item.icon = icon;
      }

      this.props.editTaskIconAndName(taskId, quest, icon, token);
      ToastService.showToast(
        "message.editIconAndNameSuccessful",
        "success",
        () => {
          this.props.fetchTasks(() => {}, () => {});
        }
      );
    }
  };

  onNextInAddMode() {
    const {
      textHabit: quest,
      timeDuration: taskDuringTime,
      colorIcon,
      iconName,
      createdDate,
    } = this.state;
    const icon = {
      name: iconName,
      color: colorIcon,
    };
    this.props.onNextScreen({
      quest,
      taskDuringTime,
      icon,
      createdDate,
    });
  }

  colorClick = color => {
    this.setState({
      colorHightLight: color,
      colorIcon: color,
    });
  };

  iconClick = icon => {
    this.setState({ iconHightLight: icon, iconName: icon });
  };

  renderListIcon = ({ item }) => {
    return (
      <Icon
        // @ts-ignore
        containerStyle={{
          padding: 20,
          backgroundColor:
            item.name === this.state.iconHightLight ? Colors.cloud : null,
        }}
        type="MaterialCommunityIcons"
        name={item.name}
        color={item.color}
        size={40}
        onPress={() => this.iconClick(item.name)}
        underlayColor={Colors.cloud}
      />
    );
  };

  renderListColor = ({ item }) => {
    return (
      <Icon
        // @ts-ignore
        containerStyle={{
          padding: 10,
          backgroundColor:
            item === this.state.colorHightLight ? Colors.cloud : null,
        }}
        type="MaterialCommunityIcons"
        name="brightness-1"
        color={item}
        underlayColor={Colors.cloud}
        size={30}
        onPress={() => this.colorClick(item)}
      />
    );
  };

  renderRightIcon = () => {
    const { textHabit, type } = this.state;
    if (!textHabit) {
      return null;
    }

    const rightTitle = type === "add" ? strings.textNext : strings.textDone;

    return (
      <TouchableOpacity onPress={this.rightTitleOnClick}>
        <Text
          style={{ color: Colors.white, textTransform: "capitalize" }}
          tx={rightTitle}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { textHabit } = this.state;

    const rightIcon = this.renderRightIcon();
    return (
      <AppBackground isLinear>
        <AppHeader
          type={"transparent"}
          leftIcon={"back"}
          title={I18n.t(strings.titleAddDetailHabit)}
          rightIcon={rightIcon}
          color={Colors.white}
          style={{ paddingBottom: 5 }}
        />
        <Content>
          <View style={styles.contentContainer}>
            <HabitInput
              style={{ paddingLeft: 25, marginTop: 10 }}
              onChangeText={text => this.onChangeInput(text, "textHabit")}
              iconName="lead-pencil"
              inputPlaceholder={capitalize(I18n.t(strings.textNameOfHabit))}
              value={textHabit}
            />
            <InlineDecorationText
              text="The icon color should be"
              style={styles.InlineDecorationText}
            />

            <FlatList
              style={{ alignSelf: "center" }}
              horizontal
              data={dataIcon.color}
              renderItem={this.renderListColor}
              keyExtractor={(item, index) => index.toString()}
            />
            <InlineDecorationText
              text="The icon I would like is"
              style={styles.InlineDecorationText}
            />
            <FlatList
              style={{ alignSelf: "center", marginBottom: 25 }}
              data={dataIcon.icon}
              renderItem={this.renderListIcon}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
            />
          </View>
        </Content>
        <View style={{ paddingBottom: 10, marginBottom: 25 }} />
      </AppBackground>
    );
  }
}

export default connect(
  null,
  { editTaskIconAndName, fetchTasks }
)(withNavigation(RenderAddDetailHabitScreen));
