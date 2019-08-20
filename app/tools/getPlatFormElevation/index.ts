import { Platform } from 'react-native'

/* eslint-enable import/no-unresolved, import/extensions */

export const getPlatformElevation = (elevation: number = 2) => {
  if (Platform.OS === 'android') { return {elevation} }

  if (elevation === 0) {
    return {
      shadowColor: 'transparent',
      zIndex: 0,
    }
  }

  return {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: elevation / 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    // we need to have zIndex on iOS, otherwise the shadow is under components that
    // are rendered later
    zIndex: 1,
  }
}
