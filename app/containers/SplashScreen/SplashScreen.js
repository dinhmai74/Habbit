import React, { Component, } from "react"
import { Image, View, } from "react-native"
import { H3, H1, } from "native-base"
import { AppBackGround, } from "../../components"
import { Images, Colors, } from "../../themes"
import styles from "./styles"

export default class SplashScreen extends Component {
  render() {
    return (
      <AppBackGround isLinear>
        <View style={styles.container}>
          <Image style={styles.logoImgView} source={Images.topLogo} />
          <H1 style={{ color: Colors.white, }}>Habit</H1>
        </View>
      </AppBackGround>
    )
  }
}
