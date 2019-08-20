import React, { PureComponent } from 'react'

import { Button, Icon, Text } from 'native-base'
import { ApplicationStyles } from '../../../themes'
import styles from '../styles'

import { NativeBaseIconType } from '../../../model'

interface Props {
  onItemPress?: () => void,
  title: string,
  iconName?: string,
  iconType?: NativeBaseIconType,
}
export default class Item extends PureComponent<Props> {
  static defaultProps = {
    onItemPress: () => {},
    iconType: 'Ionicons',
    iconName: '',
    rest: null,
  }

  render() {
    const { iconName, iconType, title, ...rest } = this.props
    if (!iconName && !title) { return null }
    return (
      <Button
        style={styles.item}
        transparent
        dark
        onPress={this.props.onItemPress}
        icon
        {...rest }
      >
        {iconName ? <Icon name={iconName} type={iconType} /> : null}
        <Text style={{ ...ApplicationStyles.text.blackText }}>{title}</Text>
      </Button>
    )
  }
}
