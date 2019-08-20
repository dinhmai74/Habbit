import { Icon, Input, Item, Label } from 'native-base'
import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInputProps, View } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../themes'

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: Colors.linearStart,
  },
  input: {
    marginLeft: 10,
  },
  label: {
    margin: 5,
    fontSize: Fonts.size.small,
  },
})

type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'

type Props = TextInputProps & {
  icon: string
  label: string
  type?: IconType
  value?: string
  placeholder?: string
  onChange: () => void
  error?: boolean
  disabled?: boolean,
}

export default class ProfileInput extends PureComponent<Props> {
  static defaultProps = {
    onChange: () => {},
    placeholder: null,
    type: 'FontAwesome',
    error: false,
    disabled: false,
  }

  render() {
    const {
      type,
      label,
      icon,
      value,
      onChangeText,
      placeholder,
      error,
      ...rest
    } = this.props
    const color = error ? Colors.redButton : undefined
    return (
      <Item stackedLabel error={error} style={{ marginBottom: 7 }}>
        <Label style={{ ...styles.label, color }}>{label}</Label>
        <Item>
          <Icon type={type} active name={icon || 'user-o'} style={{ color }} />
          <Input
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={color || Colors.inActiveText}
            onChangeText={onChangeText}
            autoCapitalize='none'
            value={value}
            {...rest}
          />
        </Item>
      </Item>
    )
  }
}
