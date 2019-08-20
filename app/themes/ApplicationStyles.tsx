import { Platform } from 'react-native'
import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'
import { spacing } from './spacing';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  icon: {
    small: {
      resizeMode: 'contain',
      aspectRatio: 1,
      width: 14,
    },
    normal: {
      resizeMode: 'contain',
      aspectRatio: 1,
      width: 40,
    },
  },
  logo: {
    normal: {
      width: Metrics.images.logoWidth,
      height: Metrics.images.logoHeight,
    },
    small: {
      width: Metrics.images.smallLogoWidth,
      height: Metrics.images.smallLogoHeight,
    },
  },
  text: {
    textButton: {
      fontFamily: Fonts.type.base,
      textAlign: 'center',
      color: Colors.white,
      includeFontPadding: false, // Android
    },
    textInput: {
      base: {
        fontFamily: Fonts.type.base,
        color: Colors.text.text,
        includeFontPadding: false, // Android
      },
      sectionText: {
        ...Fonts.style.normal,
        paddingVertical: Metrics.doubleBaseMargin,
        color: Colors.snow,
        marginVertical: Metrics.smallMargin,
        textAlign: 'center',
      },
      subtitle: {
        color: Colors.snow,
        padding: Metrics.smallMargin,
        marginBottom: Metrics.smallMargin,
        marginHorizontal: Metrics.smallMargin,
      },
    },
    titleText: {
      ...Fonts.style.h5,
      color: Colors.text.text,
    },
    headerText: {
      ...Fonts.style.h3,
      fontFamily: Fonts.type.bold,
      fontSize: 22,
      color: Colors.text.text,
    },
    blackText: {
      color: Colors.black,
    },
  },
  image: {
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...Fonts.style.h3,
      fontSize: 18,
      color: Colors.text.text,
    },
    headerText: {
      ...Fonts.style.h3,
      fontFamily: Fonts.type.bold,
      fontSize: 22,
      color: Colors.text.text,
    },
  },
  container: {
    card: {
      borderRadius: 5,
      backgroundColor: Colors.white,
      padding: spacing[5],
    },
    onePageCard: {
      borderRadius: 10,
      backgroundColor: Colors.lightGray,
      flex: 1,
      margin: Metrics.sidesPadding,
    },
    spaceTaker: {
      flex: 1,
    },
    horizontalDivider: {
      width: '100%',
      height: 1,
      backgroundColor: Colors.divider,
    },
    baseContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    centerColumnContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      resizeMode: 'contain',
      aspectRatio: 1,
      width: 14,
    },
  },
}

export default ApplicationStyles
