import { StyleSheet, } from "react-native"
import { ApplicationStyles, } from "../../themes"

export default StyleSheet.create({
  container: {},
  logo: {
    ...ApplicationStyles.logo.normal,
    alignSelf: "center",
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  formContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    marginTop: 40,
  },
})
