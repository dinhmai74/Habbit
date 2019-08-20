/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React from "react"
import {
  View,
  Text as NativeText,
  StyleSheet,
  TouchableHighlight,
  Platform,
  ViewPropTypes,
} from "react-native"
import { normalize, colors, Text, } from "react-native-elements"

type ButtonGroupProps = {
  selectedIndex: number,
  selectedIndexes: number,
  onPress(selectedIndex: number): void,
  buttons: string[] | ElementObject[],
  component?: React.ComponentClass,
  containerStyle?: StyleProp<ViewStyle>,
  buttonStyle?: StyleProp<ViewStyle>,
  selectedBackgroundColor?: string,
  textStyle?: StyleProp<TextStyle>,
  selectedTextStyle?: StyleProp<TextStyle>,
  innerBorderStyle?: InnerBorderStyleProperty,
  underlayColor?: string,
  disableSelected?: boolean,
  activeOpacity?: number,
  containerBorderRadius?: number,
  lastBorderStyle?: StyleProp<TextStyle | ViewStyle>,
  onHideUnderlay(): void,
  onShowUnderlay(): void,
  setOpacityTo(value: number): void,
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    component,
    buttons,
    onPress,
    selectedIndex,
    selectedIndexes,
    containerStyle,
    innerBorderStyle,
    lastBorderStyle,
    buttonStyle,
    textStyle,
    selectedTextStyle,
    selectedButtonStyle,
    underlayColor,
    activeOpacity,
    onHideUnderlay,
    onShowUnderlay,
    setOpacityTo,
    containerBorderRadius,
    disableSelected,
    ...attributes
  } = props

  const Component = component || TouchableHighlight
  return (
    <View
      {...attributes}
      style={[styles.container, containerStyle && containerStyle,]}
    >
      {buttons.map((button, i) => {
        const containerRadius = !isNaN(containerBorderRadius)
          ? containerBorderRadius
          : 3
        const isSelected = selectedIndex === i || selectedIndexes.includes(i)
        // console.tron.log("isSelected", isSelected)
        return (
          <Component
            activeOpacity={activeOpacity}
            setOpacityTo={setOpacityTo}
            onHideUnderlay={onHideUnderlay}
            onShowUnderlay={onShowUnderlay}
            underlayColor={underlayColor || "#ffffff"}
            disabled={!!(disableSelected && isSelected)}
            onPress={onPress ? () => onPress(i) : () => {}}
            key={i}
            style={[
              styles.button,
              // FIXME: This is a workaround to the borderColor and borderRadius bug
              // react-native ref: https://github.com/facebook/react-native/issues/8236
              i < buttons.length - 1 && {
                borderRightWidth:
                  i === 0
                    ? 0
                    : (innerBorderStyle && innerBorderStyle.width) || 1,
                borderRightColor:
                  (innerBorderStyle && innerBorderStyle.color) || colors.grey4,
              },
              i === 1 && {
                borderLeftWidth:
                  (innerBorderStyle && innerBorderStyle.width) || 1,
                borderLeftColor:
                  (innerBorderStyle && innerBorderStyle.color) || colors.grey4,
              },
              i === buttons.length - 1 && {
                ...lastBorderStyle,
                borderTopRightRadius: containerRadius,
                borderBottomRightRadius: containerRadius,
              },
              i === 0 && {
                borderTopLeftRadius: containerRadius,
                borderBottomLeftRadius: containerRadius,
              },
              isSelected && {
                backgroundColor: "white",
              },
            ]}
          >
            <View
              style={[
                styles.textContainer,
                buttonStyle && buttonStyle,
                isSelected && selectedButtonStyle && selectedButtonStyle,
              ]}
            >
              {button.element ? (
                <button.element />
              ) : (
                <Text
                  style={[
                    styles.buttonText,
                    textStyle && textStyle,
                    isSelected && { color: colors.grey1, },
                    isSelected && selectedTextStyle,
                  ]}
                >
                  {button}
                </Text>
              )}
            </View>
          </Component>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    height: 40,
  },
  buttonText: {
    fontSize: normalize(13),
    color: colors.grey2,
    ...Platform.select({
      ios: {
        fontWeight: "500",
      },
    }),
  },
})

export default ButtonGroup
