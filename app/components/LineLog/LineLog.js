import React, { Component } from 'react'
import { View } from 'react-native'
import { AppText as Text } from 'app/components'
import styled from 'styled-components/native'

import styles from './styles'
import Fonts from '../../themes/Fonts'
import colors from '../../themes/Colors'
import { ApplicationStyles, spacing } from '../../themes'
import BorderCard from '../BorderCard'


const StyledCardItem = styled(BorderCard)`
  margin-top: ${spacing[4]}px;
  flex: 1;
  justify-content: space-between;
`

export default class LineLog extends Component {
  render() {
    const { icon, content, value } = this.props
    return (
      <StyledCardItem style={styles.container}>
        <View style={styles.textWithIcon}>
          <Text style={styles.leftIcon}>{icon}</Text>
          <Text style={[styles.rightText, Fonts.style.normal]}>{content}</Text>
        </View>
        <Text style={[Fonts.style.normal, styles.value]}>{value}</Text>
      </StyledCardItem>
    )
  }
}
