import { TextStyle, ViewStyle } from 'react-native'
import { Colors } from '../../themes'
import { palette } from '../../themes/palette'
import { spacing } from '../../themes/spacing'
import { presets } from '../Text/text.presets'

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[5],
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 0,
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[1],
  fontSize: 16,
  ...presets.default,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: {
    ...BASE_VIEW,
    backgroundColor: Colors.button.linear.start,
  } as ViewStyle,
  secondary: {
    ...BASE_VIEW,
    backgroundColor: Colors.button.linear.end,
  } as ViewStyle,
  authTrans: {
    ...BASE_VIEW,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: Colors.transparent,
    alignItems: 'flex-start',
  } as ViewStyle,
  /**
   * rounded button
   */
}

export const textPresets = {
  primary: {
    ...BASE_TEXT,
    color: Colors.text.primary,
  } as TextStyle,
  secondary: {
    ...BASE_TEXT,
    color: Colors.text.primary,
  } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: palette.white,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
  authTrans: { ...BASE_TEXT, color: Colors.primary } as ViewStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
