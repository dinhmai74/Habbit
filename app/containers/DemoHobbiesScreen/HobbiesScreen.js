import React, { Component, } from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList, TouchableWithoutFeedback,
} from "react-native";
import { Icon, } from "react-native-elements"
import { Metrics, Colors, Fonts, strings, } from "../../themes"
import {
  AppBackground,
  AppHeader, Icon as AppIcon,
  InlineDecorationText,
  Text
} from '../../components'
import images from "../../themes/Images"

const data = [
  {
    content: "Mediate",
    icon: "adjust",
    color: "green",
  },
  {
    content: "Read",
    icon: "book",
    color: "red",
  },
  {
    content: "Cook something new",
    icon: "local-drink",
    color: "orange",
  },
  {
    content: "Play an instrument",
    icon: "library-music",
    color: "blue",
  },
  {
    content: "Paint or draw",
    icon: "format-paint",
    color: "green",
  },
  {
    content: "Practice an new skill",
    icon: "star",
    color: Colors.yellow,
  },
]

export default class HobbiesScreen extends Component {
  hobbieClick = titleHobbie => {
    this.props.navigation.navigate(strings.routeAddDetailHabit, {
      titleHobbie,
    })
  }

  renderListIcon = item => {
    return (
      <TouchableOpacity onPress={() => this.hobbieClick(item.item.content)}>
        <View style={{ flexDirection: "row", paddingLeft: 20, }}>
          <Icon
            containerStyle={{
              paddingBottom: 10,
              paddingTop: 10,
            }}
            type='MaterialCommunityIcons'
            name={item.item.icon}
            color={item.item.color}
            size={40}
          />
          <Text  style={[styles.text, { alignSelf: "center", paddingLeft: 20, },]}>
            {item.item.content}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderLeftIcon = () => (
    <TouchableWithoutFeedback onPress={this.props.goBack}>
      <AppIcon icon={"back"} color={Colors.white} />
    </TouchableWithoutFeedback>
  )

  render() {
    const leftIcon=this.renderLeftIcon()
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
            type='MaterialCommunityIcons'
            name='brightness-7'
            color={Colors.buttonColor}
            size={50}
          />
          <InlineDecorationText
            text='choose from these habits'
            style={{ marginBottom: 20, }}
          />
          <FlatList
            style={{ paddingBottom: 30, marginBottom: 39, }}
            data={data}
            renderItem={(item, index) => this.renderListIcon(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </AppBackground>
    )
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
})
