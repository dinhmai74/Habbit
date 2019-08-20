import { Toast } from 'native-base'

type TToast = 'danger' | 'success' | 'warning' | undefined
type TPosition = 'top' | 'bottom' | 'center' | undefined

function showToast(
  message: string,
  type: TToast = 'danger',
  callBack: () => void = () => {},
  position: TPosition = 'top',
  duration = 1000,
) {
  return Toast.show({
    text: message,
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
