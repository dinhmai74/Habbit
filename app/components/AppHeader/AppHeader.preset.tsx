import { TextStyle, View, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'
import { Icon } from '../icon'
import { spacing } from '../../themes/spacing'
import { Colors as color } from '../../themes'
import { screen } from '../../themes/Metrics'
import { presets } from '../Text/text.presets'

// static styles
export const ROOT: ViewStyle = {
  paddingHorizontal: spacing[3],
  justifyContent: 'space-between',
}
export const TRANSPARENT_ROOT_STYLE: ViewStyle = {
  ...ROOT,
  paddingTop: spacing[3],
  paddingBottom: spacing[4],
  width: '100%',
  alignSelf: 'flex-start',
}
export const NORMAL_ROOT_STYLE: ViewStyle = {
  ...ROOT,
  paddingBottom: spacing[4],
  paddingTop: spacing[1],
}

export const TITLE: TextStyle = {
  textAlign: 'center',
  ...presets.header,
  margin: spacing[3],
}
export const TITLE_MIDDLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 20,
}
export const LEFT: ViewStyle = { width: 32 }
export const RIGHT: ViewStyle = { width: 32 }
export const TRANSPARENT_TEXT: TextStyle = {
  ...TITLE,
  color: color.header.text.transparency,
}
export const NORMAL_TEXT: TextStyle = {
  ...TITLE,
  ...presets.header,
  color: color.header.text.normal,
}

export const StyledBottomBg = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${(props: { height?: number }) => props.height || 100}px;
  z-index: -1;
`

export const StyledImage = styled(Icon)`
  height: ${(props: { height?: number }) => props.height || 100}px;
  width: ${screen.width}px;
`

export const StyledRow = styled(View)`
  flex-direction: row;
`

export const StyledNotFloatingView = styled(View)``

export const StyledBody = styled(View)`
  align-items: center;
`
