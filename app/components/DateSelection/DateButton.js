/* eslint-disable react/no-access-state-in-setstate */
import React, { Component, } from "react"
import { StyleSheet, } from "react-native"
import { TextButton, } from "../Button"
import { Colors, Fonts, Metrics, } from "../../themes"
import { getFirstCharacterOfDate, } from "../../tools"

export default class DateButton extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
  }

  componentDidMount() {
    const { selected, } = this.props

    this.setState({
      selected,
    })
  }

  changeState = () => {
    this.setState({
      selected: !this.state.selected,
    })
  }

  onPress = () => {
    this.props.onChange(this.props.item)
  }

  render() {
    const { item, } = this.props
    let title = getFirstCharacterOfDate(item.date)
    let buttonStyles = styles.buttons
    buttonStyles = {
      ...buttonStyles,
    }
    if (this.props.isToday) {
      title = "Today"
      const todayStyle = {
        paddingRight: 10,
        paddingLeft: 10,
        padding: 0,
      }
      buttonStyles = { ...buttonStyles, ...todayStyle, }
    } else {
      buttonStyles = {
        ...buttonStyles,
        width: Metrics.screenWidth / 9,
        height: Metrics.screenWidth / 9,
        paddingLeft: 0,
        paddingRight: 0,
        padding: 0,
      }
    }

    if (this.props.checkedKey === this.props.day) {
      buttonStyles.borderColor = Colors.dateButtonBorderActive
      buttonStyles.backgroundColor = Colors.dateButtonBorderActive
    } else {
      buttonStyles.borderColor = Colors.dateButtonBorderInactive
    }

    return (
      <TextButton
        text={title}
        textStyle={styles.text}
        textColor={Colors.dateButtonBorderInactive}
        style={buttonStyles}
        onPress={this.onPress}
      />
    )
  }
}

const padding = 10

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 25,
    marginLeft: 3,
    marginRight: 3,
  },
  text: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold,
  },
})
