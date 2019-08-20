import { Toast } from 'native-base'
import { translate } from '../../../Habit/app/i18n'

type TToast = 'danger' | 'success' | 'warning' | undefined
type TPosition = 'top' | 'bottom' | 'center' | undefined

function showToast(
  message: string,
  type: TToast = 'danger',
  callBack: () => void = () => {},
  position: TPosition = 'bottom',
  duration = 3000,
) {
  const text = translate(message)
  const buttonText = translate('common.ok')

  return Toast.show({
    text,
    buttonText,
    duration,
    position,
    type,
    onClose: callBack,
  })
}

export default {
  showToast,
}
