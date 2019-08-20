import { flatten, mergeAll } from 'ramda'
import * as React from 'react'
import { Text as EText } from 'react-native-elements'
import I18n from '../../localization'
import { presets } from './text.presets'
import { TextProps } from './text.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = 'default',
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && I18n.t(tx)
  const content = i18nText || text || children

  const style = mergeAll(
    flatten([presets[preset] || presets.default, styleOverride]),
  )

  return (
    <EText {...rest} style={style}>
      {content}
    </EText>
  )
}
