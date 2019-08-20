// @flow
import React, { PureComponent, } from "react"
import { View, StyleSheet, } from "react-native"
import { Text, Button, } from "native-base"
import _ from "lodash"

import { CardItem, InlineDecorationText, } from "../../../../components"
import { Colors, } from "../../../../themes"
import ButtonGroup from "./ButtonGroup"

const styles = {
  title: {
    marginBottom: 10,
    color: Colors.text,
  },
  container: {
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonGroupStyle: {
    width: "100%",
  },
  fullSizeButton: {
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.white,
  },
  selectedButton: {
    backgroundColor: Colors.darkButtonColor,
  },
}

type TypeScheduleSelection = "one" | "multiple"

type Props = {
  title: string,
  summaryText?: string,
  buttons: Array<string>,
  onSelected?: Function,
  style?: ?Object,
  type?: TypeScheduleSelection,
  selected?: Array<number>,
}

type State = {
  selectedIndex: Array<number>,
}

export default class ScheduleSelection extends PureComponent<Props, State> {
  static defaultProps = {
    onSelected: () => {},
    style: null,
    summaryText: "",
    type: "one",
    selected: null,
  }

  constructor() {
    super()
    this.state = {
      selectedIndex: [0,],
    }
  }

  componentDidMount() {
    if (this.props.selected) {
      this.setState({
        selectedIndex: this.props.selected,
      })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected !== this.props.selected)
      this.setState({
        selectedIndex: nextProps.selected,
      })
  }

  getSelectedIndex = () => this.state.selectedIndex

  updateIndex = (selected: number): void => {
    const { type, } = this.props
    const { selectedIndex, } = this.state

    if (type === "one") this.setState({ selectedIndex: [selected,], })
    else if (selected === -1) {
      this.setState({
        selectedIndex: [-1,],
      })
    } else {
      const isSelected = selectedIndex.includes(selected)
      let newArray = selectedIndex.filter(e => e !== -1)
      if (isSelected) {
        newArray = newArray.filter(e => e !== selected)
      } else {
        newArray = [...newArray, selected,]
        if (newArray.length === this.props.buttons.length) newArray = [-1,]
      }

      this.setState({ selectedIndex: newArray, })
    }

    this.props.onSelected(selected)
  }

  render() {
    const { selectedIndex, } = this.state
    const { buttons, title, style, summaryText, type, } = this.props
    const summaryButtonSelected =
      selectedIndex[0] === -1 && selectedIndex.length === 1
    const summaryTextNormalBg = !summaryButtonSelected
      ? { backgroundColor: Colors.white, }
      : null

    return (
      <View style={[styles.container, style,]}>
        <InlineDecorationText text={title} textStyle={styles.title} />
        <View style={styles.buttonGroupStyle}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndexes={selectedIndex}
            buttons={buttons}
            buttonStyle={styles.button}
            selectedButtonStyle={styles.selectedButton}
            selectedTextStyle={{ color: Colors.white, }}
          />
          {type === "multiple" ? (
            <Button
              dark
              full
              style={[styles.fullSizeButton, summaryTextNormalBg,]}
              bordered={!summaryButtonSelected}
              onPress={() => this.updateIndex(-1)}
            >
              <Text>{summaryText}</Text>
            </Button>
          ) : null}
        </View>
      </View>
    )
  }
}
