import { Platform } from 'react-native'

const CenteredTextStyle = (height: number) => {
  if (Platform.OS === 'ios') {
    return {
      textAlign: 'center',
      lineHeight: height,
    }
  } else {
    return {
      textAlignVertical: 'center',
      textAlign: 'center',
    }
  }
}

export default CenteredTextStyle
