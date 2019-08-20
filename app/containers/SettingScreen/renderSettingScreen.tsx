/* eslint-disable react/require-default-props */
// @flow
import { Content } from 'native-base'
import React, { Component } from 'react'

import {AppBackground} from '../../components'
import AppImageHeader from '../../components/AppImageHeader'
import I18n from '../../localization'
import { Images, strings } from '../../themes'
import { capitalize } from '../../tools'
import Item from './components/Item'
import styles from './styles'

interface Props {
  onLogoutPress: () => void,
  onHelpPress: () => void,
  onProfilePress: () => void,
  userName: string,
}

export default class RenderSettingScreen extends Component<Props> {
  static defaultProps = {
    onLogoutPress: () => {},
    onHelpPress: () => {},
    onProfilePress: () => {},
    userName: I18n.t(strings.titleSetting),
  }

  render() {
    return (
      <AppBackground style={{ backgroundColor: 'white' }}>
        <AppImageHeader
          leftIcon={Images.iconLeftArrow}
          title={this.props.userName}
          backgroundSrc={Images.profilePicture}
        />
        <Content style={styles.container}>
          <Item
            title={capitalize(I18n.t(strings.textProfileSetting))}
            onItemPress={this.props.onProfilePress}
            iconName='settings'
            iconType='MaterialIcons'
          />

          <Item
            title={capitalize(I18n.t(strings.textHelp))}
            onItemPress={this.props.onHelpPress}
            iconName='help-outline'
            iconType='MaterialIcons'
          />

          <Item
            title={capitalize(I18n.t(strings.textLogout))}
            iconName='power-settings-new'
            iconType='MaterialIcons'
            onItemPress={this.props.onLogoutPress}
          />
        </Content>
      </AppBackground>
    )
  }
}
