// @flow
import { Content } from 'native-base'
import React, { Component } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {
  AppBackground,
  AppHeader,
  InlineDecorationText,
  Text,
} from '../../../components'
import I18n from '../../../localization'

import dataIcon from '../../../model/icon.json'
import { Colors, strings } from '../../../themes'
import images from '../../../themes/Images'
import { capitalize, today } from '../../../tools'
import HabitInput from './components/HabitInput'
import styles from './styles'

interface IProps {
  onNextScreen: Function
  titleHobbie?: string
}

interface IState {
  textHabit: string
  timeDuration: number
  colorIcon: string
  iconName: string
  createdDate: string

  [anotherState: string]: any
}

class RenderAddDetailHabitScreen extends Component<IProps, IState> {
  state = {
    // eslint-disable-next-line react/no-unused-state
    textHabit: '',
    timeDuration: 20,
    colorIcon: dataIcon.color[0],
    iconName: dataIcon.icon[0].name,
    createdDate: today,
    colorHightLight: dataIcon.color[0],
    iconHightLight: dataIcon.icon[0].name,
  }

  componentWillMount() {
    if (this.props.titleHobbie) {
      this.setState({ textHabit: this.props.titleHobbie })
    }
  }

  componentWillUpdate() {}

  onChangeInput = (text: string, type: string): void => {
    this.setState({
      [type]: text,
    })
  }

  rightTitleOnClick = () => {
    const {
      textHabit: quest,
      timeDuration: taskDuringTime,
      colorIcon,
      iconName,
      createdDate,
    } = this.state
    const icon = {
      name: iconName,
      color: colorIcon,
    }
    this.props.onNextScreen({
      quest,
      taskDuringTime,
      icon,
      createdDate,
    })
  }

  colorClick = (color) => {
    this.setState({
      colorHightLight: color,
      colorIcon: color,
    })
  }

  iconClick = (icon) => {
    this.setState({ iconHightLight: icon, iconName: icon })
  }

  renderListIcon = ({ item }) => {
    return (
      <Icon
        // @ts-ignore
        containerStyle={{
          padding: 20,
          backgroundColor:
            item.name === this.state.iconHightLight ? Colors.cloud : null,
        }}
        type='MaterialCommunityIcons'
        name={item.name}
        color={item.color}
        size={40}
        onPress={() => this.iconClick(item.name)}
        underlayColor={Colors.cloud}
      />
    )
  }

  renderListColor = ({ item }) => {
    return (
      <Icon
        // @ts-ignore
        containerStyle={{
          padding: 10,
          backgroundColor:
            item === this.state.colorHightLight ? Colors.cloud : null,
        }}
        type='MaterialCommunityIcons'
        name='brightness-1'
        color={item}
        underlayColor={Colors.cloud}
        size={30}
        onPress={() => this.colorClick(item)}
      />
    )
  }

  renderRightIcon = () => {
    const { textHabit } = this.state
    if (!textHabit) {
      return null
    }

    return (
      <TouchableOpacity onPress={this.rightTitleOnClick}>
        <Text
          style={{ color: Colors.white, textTransform: 'capitalize' }}
          tx={strings.textNext}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { textHabit } = this.state

    const rightIcon = this.renderRightIcon()
    return (
      <AppBackground isLinear>
        <AppHeader
          type={'transparent'}
          leftIcon={'back'}
          title={I18n.t(strings.titleAddDetailHabit)}
          rightIcon={rightIcon}
          color={Colors.white}
          style={{ paddingBottom: 5 }}
        />
        <Content >
          <View style={styles.contentContainer}>
          <HabitInput
            style={{ paddingLeft: 25, marginTop: 10 }}
            onChangeText={(text) => this.onChangeInput(text, 'textHabit')}
            iconName='lead-pencil'
            inputPlaceholder={capitalize(I18n.t(strings.textNameOfHabit))}
            value={textHabit}
          />
          <InlineDecorationText
            text='The icon color should be'
            style={styles.InlineDecorationText}
          />

          <FlatList
            style={{ alignSelf: 'center' }}
            horizontal
            data={dataIcon.color}
            renderItem={this.renderListColor}
            keyExtractor={(item, index) => index.toString()}
          />
          <InlineDecorationText
            text='The icon I would like is'
            style={styles.InlineDecorationText}
          />
          <FlatList
            style={{ alignSelf: 'center', marginBottom: 25 }}
            data={dataIcon.icon}
            renderItem={this.renderListIcon}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
          </View>
        </Content>
        <View style={{ paddingBottom: 10, marginBottom: 25 }} />
      </AppBackground>
    )
  }
}

export default RenderAddDetailHabitScreen
