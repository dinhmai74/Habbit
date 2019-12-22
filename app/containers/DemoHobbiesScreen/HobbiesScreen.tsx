import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import { Metrics, Colors, Fonts, strings } from "../../themes";
import {
  AppBackground,
  AppHeader,
  AppIcon,
  InlineDecorationText,
  Text,
} from "../../components";
import images from "../../themes/Images";
import { withNavigation } from "react-navigation";

export interface HobbieModel {
  id: string;
  content: string;
  color: string;
  icon: string;
}

const hobbies: HobbieModel[][] = [
  [
    {
      id: "b5d4d748-3330-55b7-b725-7e572f7f68a2",
      content: "Mediate",
      icon: "adjust",
      color: "green",
    },
    {
      id: "a8f9a47b-1318-5788-ba4a-9a41d6e18918",
      content: "Sleep early",
      icon: "alarm-off",
      color: "red",
    },
    {
      id: "84a68a6e-fbbb-5cde-a6f7-d5fd6118d66e",
      content: "Drink water",
      icon: "local-drink",
      color: "orange",
    },
  ],
  [
    {
      id: "b5d4d748-3330-55b7-b725-7e572f7f68a2",
      content: "Work out",
      icon: "date-range",
      color: "#dcd084",
    },
    {
      id: "a8f9a47b-1318-5788-ba4a-9a41d6e18918",
      content: "Excercises",
      icon: "alarm-off",
      color: "#c82d45",
    },
    {
      id: "84a68a6e-fbbb-5cde-a6f7-d5fd6118d66e",
      content: "Run",
      icon: "crop-rotate",
      color: "#2c240f",
    },
  ],
  [
    // home
    {
      id: "43044063-660e-52bb-a05a-d7f5d5971bb8",
      content: "Play an instrument",
      icon: "library-music",
      color: "blue",
    },
    {
      id: "0a297d2d-d217-504f-bae6-9994beb06c3e",
      content: "Paint or draw",
      icon: "format-paint",
      color: "green",
    },
    {
      id: "3025162d-658c-59fd-b103-2272a6e91f70",
      content: "Practice an new skill",
      icon: "star",
      color: Colors.yellow,
    },
  ],
  [
    {
      id: "43044063-660e-52bb-a05a-d7f5d5971bb8",
      content: "Play an instrument",
      icon: "library-music",
      color: "blue",
    },
    {
      id: "0a297d2d-d217-504f-bae6-9994beb06c3e",
      content: "Paint or draw",
      icon: "format-paint",
      color: "green",
    },
    {
      id: "3025162d-658c-59fd-b103-2272a6e91f70",
      content: "Practice an new skill",
      icon: "star",
      color: Colors.yellow,
    },
  ],
  [
    {
      id: "43044063-660e-52bb-a05a-d7f5d5971bb8",
      content: "Play an instrument",
      icon: "library-music",
      color: "blue",
    },
    {
      id: "0a297d2d-d217-504f-bae6-9994beb06c3e",
      content: "Paint or draw",
      icon: "format-paint",
      color: "green",
    },
    {
      id: "3025162d-658c-59fd-b103-2272a6e91f70",
      content: "Practice an new skill",
      icon: "star",
      color: Colors.yellow,
    },
  ],
  [
    {
      id: "43044063-660e-52bb-a05a-d7f5d5971bb8",
      content: "Play an instrument",
      icon: "library-music",
      color: "blue",
    },
    {
      id: "0a297d2d-d217-504f-bae6-9994beb06c3e",
      content: "Paint or draw",
      icon: "format-paint",
      color: "green",
    },
    {
      id: "3025162d-658c-59fd-b103-2272a6e91f70",
      content: "Practice an new skill",
      icon: "star",
      color: Colors.yellow,
    },
  ],
];

class HobbiesScreen extends Component<any, any> {
  hobbieClick = titleHobbie => {
    this.props.navigation.navigate(strings.routeAddDetailHabit, {
      titleHobbie,
    });
  };

  renderListIcon = item => {
    return (
      <TouchableOpacity onPress={() => this.hobbieClick(item.item.content)}>
        <View style={{ flexDirection: "row", paddingLeft: 20 }}>
          <Icon
            containerStyle={{
              paddingBottom: 10,
              paddingTop: 10,
            }}
            type="MaterialCommunityIcons"
            name={item.item.icon}
            color={item.item.color}
            size={40}
          />
          <Text style={[styles.text, { alignSelf: "center", paddingLeft: 20 }]}>
            {item.item.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLeftIcon = () => (
    <TouchableWithoutFeedback onPress={this.props.goBack}>
      <AppIcon icon={"back"} color={Colors.white} />
    </TouchableWithoutFeedback>
  );

  render() {
    const leftIcon = this.renderLeftIcon();
    const id = this.props.navigation.getParam("id", 0);
    const data = hobbies[id];
    return (
      <AppBackground isLinear>
        <AppHeader
          leftIcon={"back"}
          headerTx={"title.hobbies"}
          type={"transparent"}
          color={Colors.white}
        />

        <View style={styles.contentContainer}>
          <Icon
            containerStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              margin: 10,
            }}
            type="MaterialCommunityIcons"
            name="brightness-7"
            color={Colors.buttonColor}
            size={50}
          />
          <InlineDecorationText
            text="choose from these habits"
            style={{ marginBottom: 20 }}
          />
          <FlatList
            style={{ paddingBottom: 30, marginBottom: 39 }}
            data={data}
            renderItem={this.renderListIcon}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    margin: Metrics.sidesPadding,
    padding: 20,
    marginBottom: Metrics.screenHeight * 0.4,
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  },
});

export default withNavigation(HobbiesScreen);
