import { Toast } from 'native-base'
import AppI18n from '../localization';

type TToast = 'danger' | 'success' | 'warning' | undefined
type TPosition = 'top' | 'bottom' | 'center' | undefined

function showToast(
  message: string,
  type: TToast = 'danger',
  callBack: () => void = () => {},
  position: TPosition = 'bottom',
  duration = 3000,
) {
  const text = AppI18n.t(message)
  const buttonText = AppI18n.t('common.ok')

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
