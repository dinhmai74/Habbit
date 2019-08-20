import { NavigationActions } from 'react-navigation'
import { RootRouteName } from '../router/RootNavigator'

let navigator: {
  dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void
}

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

function navigate(routeName: RootRouteName, params: any = null) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
}
