import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../themes'
import metrics from '../../themes/Metrics'
import { spacing } from '../../themes/spacing'

export default StyleSheet.create({
  container: {},
  contentContainer: {
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    margin: metrics.sidesPadding,
    marginBottom: spacing[8]
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    color: Colors.panther,
    fontSize: Fonts.size.regular,
  },
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    padding: 5,
    fontFamily: Fonts.type.bold,
    textDecorationLine: 'underline',
  },
  InlineDecorationText: {
    margin: 10,
  },
})
