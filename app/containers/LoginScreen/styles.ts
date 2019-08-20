import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../themes'

export default StyleSheet.create({
  container: {},
  button: {
    marginTop: 40,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: Fonts.type.base,
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: Fonts.type.base,
    fontSize: 13,
  },
  signUpButton: {
    marginTop: 40,
    borderRadius: 50,
    alignSelf: 'center',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  or: {
    marginTop: 30,
    color: Colors.white,
    ...Fonts.style.normalBold,
    alignSelf: 'center',
  },
  socialContainer: {
    flex: 2,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  googleButton: {
    height: Metrics.googleLogiButtonHeight,
    width: Metrics.googleLogiButtonWidth,
    backgroundColor: Colors.redButton,
    marginLeft: 16,
    marginRight: 16,
    paddingVertical: 0,
  },
  facebookButton: {
    width: Metrics.googleLogiButtonWidth,
    height: Metrics.googleLogiButtonHeight,
    backgroundColor: Colors.facebook,
    marginLeft: 16,
    marginRight: 16,
    paddingVertical: 0,
  },
})
