// @flow
import { Content } from 'native-base'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {
  AppBackGround,
  AppHeader,
  InlineDecorationText,
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

  render() {
    const { textHabit } = this.state
    const isHasValue = textHabit
    return (
      <AppBackGround isLinear>
        <AppHeader
          leftIcon={images.iconLeftArrow}
          title={I18n.t(strings.titleAddDetailHabit)}
          rightTitle={isHasValue ? capitalize(I18n.t(strings.textNext)) : null}
          rightTitleOnClick={this.rightTitleOnClick}
          style={{ paddingBottom: 5 }}
        />
        <Content style={styles.contentContainer}>
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
        </Content>
        <View style={{ paddingBottom: 10, marginBottom: 25 }} />
      </AppBackGround>
    )
  }
}

export default RenderAddDetailHabitScreen
