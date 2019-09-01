import { Content, Spinner } from "native-base";
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  AppBackground,
  AppHeader,
  InlineDecorationText,
  ToastService,
} from "../../components";
import I18n from "../../localization";

import firebase from "react-native-firebase";
import { NavigationScreenProps } from "react-navigation";
import { editTaskIconAndName, editTaskStatus, refetchTasks } from "actions";
import FirebaseWorker from "../../api/firebase";
import { IconDisplayModel } from "../../model";
import dataIcon from "../../model/icon.json";
import { Colors, strings } from "../../themes";
import images from "../../themes/Images";
import { capitalize, today } from "../../tools";
import HabitInput from "../AddHabitScreen/AddDetailHabitScreen/components/HabitInput";
import styles from "./styles";

interface IProps extends NavigationScreenProps {
  onNextScreen: () => void;
  refetchTasks: typeof refetchTasks;
  editTaskStatus: typeof editTaskStatus;
  editTaskIconAndName: typeof editTaskIconAndName;
}

interface IState {
  textHabit: string;
  timeDuration: number;
  colorIcon: string;
  iconName: string;
  createdDate: string;
  [propName: string]: any;
  loading: boolean;
  colorHightLight: string;
  iconHightLight: string;
}

class EditNameIconScreen extends Component<IProps, IState> {
  state = {
    // eslint-disable-next-line react/no-unused-state
    textHabit: "",
    timeDuration: 20,
    colorIcon: "#863280",
    iconName: "android",
    createdDate: today,
    colorHightLight: "",
    iconHightLight: "",
    loading: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const quest = navigation.getParam("title");
    const iconName = navigation.getParam("iconName");
    const iconColor = navigation.getParam("iconColor");
    this.setState({
      textHabit: quest,
      colorHightLight: iconColor,
      iconHightLight: iconName,
    });
  }

  onChangeInput = (text: string, type: string): void => {
    this.setState({
      [type]: text,
    });
  };

  rightTitleOnClick = async () => {
    const { textHabit: quest, colorIcon, iconName } = this.state;
    const icon: IconDisplayModel = {
      name: iconName,
      color: colorIcon,
    };

    const taskId = this.props.navigation.getParam("taskId", false);
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

    // this.setState({
    //   loading: true,
    // })
    // const resultIcon = await FirebaseWorker.updateIconAndQuest(
    //   taskId,
    //   icon,
    //   quest,
    // )
    // if (resultIcon.error) {
    //   ToastService.showToast(I18n.t(strings.errEditScheduleFailed))
    //   this.setState({
    //     loading: false,
    //   })
    // } else {
    //   ToastService.showToast(I18n.t(strings.textEditScheduleSuccess), 'success')
    //   this.setState({
    //     loading: false,
    //   })
    // }

    // this.props.editTaskStatus(taskId, icon, quest)
    const user = await firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();

      this.props.editTaskIconAndName(taskId, quest, icon, token);
      setTimeout(() => {
        this.props.navigation.navigate(strings.routeHome);
      }, 100);
    }
  };

  colorClick = (color: string) => {
    this.setState({
      colorHightLight: color,
      colorIcon: color,
    });
  };

  iconClick = (icon: string) => {
    this.setState({ iconHightLight: icon, iconName: icon });
  };

  renderListIcon = ({ item }) => {
    const { color, name } = item;
    return (
      <Icon
        // @ts-ignore
        containerStyle={{
          padding: 20,
          backgroundColor:
            name === this.state.iconHightLight ? Colors.cloud : null,
        }}
        type="MaterialCommunityIcons"
        name={name}
        color={color}
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

  renderRightHeader = () => {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Text style={styles.buttonText} onPress={this.rightTitleOnClick}>
        {capitalize(I18n.t(strings.textDone))}
      </Text>
    );
  };

  render() {
    const { textHabit } = this.state;
    const { navigation } = this.props;
    const iconName = navigation.getParam("iconName");
    const iconColor = navigation.getParam("iconColor");
    const taskId = navigation.getParam("taskId");
    const quest = navigation.getParam("title");

    return (
      <AppBackground isLinear>
        <AppHeader
          leftIcon={images.iconLeftArrow}
          title="Edit habit"
          rightComponent={this.renderRightHeader()}
          rightTitle={capitalize("Done")}
          rightTitleOnClick={this.rightTitleOnClick}
          style={{ paddingBottom: 10 }}
        />
        <Content style={styles.contentContainer}>
          <HabitInput
            style={{ paddingLeft: 25 }}
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
            style={{ alignSelf: "center" }}
            data={dataIcon.icon}
            renderItem={this.renderListIcon}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </Content>
        <View style={{ paddingBottom: 25 }} />
      </AppBackground>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { refetchTasks, editTaskStatus, editTaskIconAndName }
)(EditNameIconScreen);
