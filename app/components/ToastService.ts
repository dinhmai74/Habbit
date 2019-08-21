import { Toast } from 'native-base'
import AppI18n from '../localization'

type TToast = 'danger' | 'success' | 'warning' | undefined
type TPosition = 'top' | 'bottom' | 'center' | undefined

function showToast(
  message: string,
  type: TToast = 'danger',
  callBack: () => void = () => {},
  position: TPosition = 'top',
  duration = 1000
) {
  return Toast.show({
    text: AppI18n.t(message),
    buttonText: 'Okay',
    duration,
    position,
    type,
    onClose: callBack,
  })
}

export default {
  showToast,
}
