import React, { PureComponent, } from "react"
import { StyleSheet, } from "react-native"
import { Item, Icon, Input, } from "native-base"
import { Colors, ApplicationStyles, Fonts, Metrics, } from "../../../../themes"

const styles = StyleSheet.create({
  icon: {
    color: Colors.text,
    alignSelf: "center",
  },
  input: {
    ...ApplicationStyles.text.textInput.base,
    fontSize: Fonts.size.input,
  },
})

type Props = {
  iconType?: string,
  iconStyle?: ?Object,
  iconName: string,
  inputPlaceholder: string,
  style?: ?Object,
  error?: boolean,
  onChangeText: Function,
  onSubmitEditing?: Function,
}

export default class HabitInput extends PureComponent<Props> {
  static defaultProps = {
    style: null,
    iconType: "MaterialCommunityIcons",
    iconStyle: null,
    error: false,
    onSubmitEditing: () => {},
  }

  render() {
    const {
      iconName,
      iconType,
      inputPlaceholder,
      style,
      iconStyle,
      error,
      onChangeText,
      onSubmitEditing,
      ...rest
    } = this.props
    return (
      <Item error={error} style={[{ borderColor: "transparent", }, style,]}>
        <Icon
          style={[styles.icon, iconStyle,]}
          type={iconType}
          fontSize={Metrics.icons.medium}
          name={iconName}
        />
        <Input
          autoCapitalize='none'
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          style={[styles.input,]}
          placeholder={inputPlaceholder}
          {...rest}
        />
      </Item>
    )
  }
}
