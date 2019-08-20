import * as React from 'react'
import { Button as EButton } from 'react-native-elements'

import { flatten, mergeAll } from 'ramda'
import { ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../localization'
import { Colors } from '../../themes'
import { withSpacing } from '../WrappedSpacingComponent'
import { textPresets, viewPresets } from './button.presets'
import { ButtonProps } from './button.props'

function CButton({
  preset = 'primary',
  tx,
  text,
  style: styleOverride,
  textStyle: textStyleOverride,
  children,
  txOptions,
  linear,
  full,
  rounded,
  ...rest
}: ButtonProps) {
  // grab the props

  // @ts-ignore
  const containerStyle: ViewStyle = full ? { alignSelf: 'stretch' } : null
  // @ts-ignore
  const roundedStyle: ViewStyle = rounded ? { borderRadius: 30 } : null

  const viewStyle = mergeAll(
    flatten([viewPresets[preset], roundedStyle, styleOverride]),
  )
  const textStyle = mergeAll(flatten([textPresets[preset], textStyleOverride]))

  const i18nText = tx && I18n.t(tx)
  const content = i18nText || text || children
  const colors = linear
    ? [Colors.button.linear.start, Colors.button.linear.end]
    : ['transparent', 'transparent']

  return (
    <EButton
      containerStyle={containerStyle}
      titleStyle={textStyle}
      buttonStyle={viewStyle}
      title={content}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors,
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      {...rest}
    />
  )
}
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export default withSpacing(CButton)
