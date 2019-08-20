import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-swipeable'
import styled from 'styled-components'

import { Button, Text } from 'native-base'
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { editTaskStatus } from '../../../actions'
import { AppText, CardItem, RowView } from '../../../components'
import ModalTask from '../../../components/Modal'
import I18n from '../../../localization'
import { IArchived, IHabitItem } from '../../../model'
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Metrics,
  strings,
} from '../../../themes'
import { capitalize } from '../../../tools'

const SubIconEnum = {
  close: 'close',
  star: 'star',
  check: 'check',
}

interface IProps {
  status: string
  style?: object
  leftText?: string
  rightText?: string
  onCardPress: (detailCardInfo: IHabitItem, ...rest: any) => void
  leftButtonOnClick?: () => void
  rightButtonOnClick?: () => void
  releaseTime?: number
  navigation: NavigationScreenProp<any, any>
  cardInfo: IHabitItem
  editTaskStatus: typeof editTaskStatus
  taskDate: string
  deleteTask: Function
}

class HabitCard extends Component<IProps> {
  static defaultProps = {
    style: null,
    color: Colors.text,
    leftText: capitalize(I18n.t(strings.textDone)),
    rightText: capitalize(I18n.t(strings.textSkip)),
    onCardPress: () => {},
    leftButtonOnClick: () => {},
    rightButtonOnClick: () => {},
    releaseTime: 200,
  }

  state = {
    isSwiped: false,
    status: '',
  }
  refSwipeable: any
  refModalTask: any
  refRightButton: any

  componentDidMount() {
    this.setState({
      status: this.props.status,
    })
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.status !== this.state.status) {
      this.setState({ status: nextProps.status })
    }
  }

  resetState = () => {
    this.setState({
      isSwiped: false,
    })
  }

  leftButtonRelease = () => {
    setTimeout(() => {
      this.setState(
        {
          isSwiped: true,
          status: 'done',
        },
        () => {
          if (this.props.leftButtonOnClick) {
            this.props.leftButtonOnClick()
          }
          if (this.refSwipeable) {
            this.refSwipeable.recenter()
          }
        },
      )
    }, this.props.releaseTime)
  }

  rightButtonRelease = () => {
    setTimeout(() => {
      this.setState(
        {
          isSwiped: true,
          status: 'skipped',
        },
        () => {
          if (this.props.rightButtonOnClick) {
            this.props.rightButtonOnClick()
          }
          if (this.refSwipeable) {
            this.refSwipeable.recenter()
          }
        },
      )
    }, this.props.releaseTime)
  }

  rightButtonOnClick = () => {
    this.setState({
      isSwiped: true,
      status: 'skipped',
    })
    if (this.props.rightButtonOnClick) {
      this.props.rightButtonOnClick()
    }
  }

  undoOnModal = async (taskId: string, status: IArchived, date: string) => {
    const user = await firebase.auth().currentUser
    let token = ''
    if (user) {
      token = await user.getIdToken()
    }
    this.setState(
      {
        status: 'spending',
      },
      () => {
        if (token) {
          this.props.editTaskStatus(taskId, 'spending', date, token)
        }
      },
    )
  }

  viewDetail = () => {
    const { cardInfo } = this.props
    this.props.onCardPress(cardInfo)
  }

  containerPress = () => {
    const { status } = this.state

    const isInActiveCard = status === 'done' || status === 'skipped'

    if (isInActiveCard) {
      this.refModalTask.showModal()
    } else {
      const { cardInfo } = this.props
      this.props.onCardPress(cardInfo)
    }
  }

  renderLeftButtons = () => [
    <LeftSwipeView>
      <Button
        style={[styles.button, styles.leftButton]}
        // @ts-ignore
        onPress={this.props.leftButtonOnClick}
      >
        <Text
          // @ts-ignore
          style={ApplicationStyles.text.textButton}
        >
          {this.props.leftText}
        </Text>
      </Button>
    </LeftSwipeView>,
  ]

  renderRightButtons = () => [
    <RightSwipeView>
      <Button
        style={styles.button}
        onPress={this.rightButtonOnClick}
        transparent
      >
        <Text
          // @ts-ignore
          style={ApplicationStyles.text.textButton}
        >
          {this.props.rightText}
        </Text>
      </Button>
    </RightSwipeView>,
  ]

  render() {
    const { style, cardInfo } = this.props
    const { quest: title, icon } = cardInfo
    const { name: iconName, color } = icon
    const { status } = this.state

    let subTitleIcon = SubIconEnum.star
    if (status === 'done') {
      subTitleIcon = SubIconEnum.check
    } else if (status === 'overdue' || status === 'skipped') {
      subTitleIcon = SubIconEnum.close
    }

    const isDisable = status === 'skipped' || status === 'done'

    const colorToggle = isDisable ? Colors.inActiveText : null
    const leftButtons = isDisable ? null : this.renderLeftButtons()
    const rightButtons = isDisable ? null : this.renderRightButtons()
    const textInactiveColor = isDisable ? { color: Colors.inActiveText } : null

    const length = 12
    let trimTitle = ''
    if (title) {
      trimTitle =
        title.length > length ? `${title.substring(0, length)}...` : title
    }

    return (
      // @ts-ignore
      <Container style={style} ref={(c: any) => (this.refRightButton = c)}>
        <ModalTask
          ref={(c) => {
            this.refModalTask = c
          }}
          habitCardProp={this.props}
          // @ts-ignore
          contentStyle={styles.modal}
          undoOnModal={this.undoOnModal}
          viewDetail={this.viewDetail}
          status={status}
        />
        <Swipeable
          onRef={(ref: any) => (this.refSwipeable = ref)}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
          leftButtonWidth={100}
          rightButtonWidth={100}
          onLeftButtonsOpenRelease={this.leftButtonRelease}
          onRightButtonsOpenRelease={this.rightButtonRelease}
        >
          <TouchableOpacity onPress={this.containerPress}>
            <RowView>
              <Icon
                type='MaterialCommunityIcons'
                name={iconName}
                iconStyle={{ color: colorToggle || color }}
                containerStyle={styles.icon}
                color='transparent'
                size={Metrics.icons.medium}
                reverse
              />

              <Content>
                <Text style={[styles.title, textInactiveColor]}>
                  {capitalize(trimTitle)}
                </Text>
                <StatusView>
                  <Icon
                    type='MaterialCommunityIcons'
                    name={subTitleIcon}
                    color={colorToggle || color}
                    size={20}
                    containerStyle={{ marginRight: 10 }}
                  />
                  <Text style={textInactiveColor}>{status}</Text>
                </StatusView>
              </Content>
            </RowView>
          </TouchableOpacity>
        </Swipeable>
      </Container>
    )
  }
}

const StatusView = styled(RowView)`
  padding: 10px;
`

const Content = styled(View)`
  padding: 5px;
  margin: 10px 0;
`

const Container = styled(CardItem)`
  padding: 0;
`

const LeftSwipeView = styled(View)`
  display: flex
  flex: 1
  alignItems: flex-end
  justifyContent: flex-end
  paddingRight: 20
  margin-right: 20
  backgroundColor: ${Colors.green}
`

const RightSwipeView = styled(View)`
  display: flex
  flex: 1
  justifyContent: center
  paddingLeft: 20
  margin-right: 20
  backgroundColor: ${Colors.buttonColorInColoredBackground}
`

const styles = StyleSheet.create({
  leftButton: {
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: 'transparent',
    flex: 1,
    elevation: 0,
  },
  title: {
    ...ApplicationStyles.text.titleText,
    flex: 1,
    marginRight: 100,
  },
  icon: {
    alignSelf: 'center',
  },
  modal: {
    padding: 20,
    paddingLeft: Metrics.sidesPadding,
    paddingRight: Metrics.sidesPadding,
  },
})

export default connect(
  null,
  { editTaskStatus },
  // @ts-ignore
)(HabitCard)
