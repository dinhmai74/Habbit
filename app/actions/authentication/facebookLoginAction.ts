// @ts-nocheck
import {
  IFacebookLoginSuccessAction,
  IFacebookLoginFailedAction,
  IFacebookLoginAction,
  FACEBOOK_LOGIN_FAILED,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN,
} from '../ActionTypes'

import { ResponseFirebase, TypeUser } from '../../model'

// eslint-disable-next-line import/prefer-default-export
export const facebookLogin = (
  resolve: Function,
  reject: Function
): IFacebookLoginAction => {
  return {
    type: FACEBOOK_LOGIN,
    resolve,
    reject,
  }
}

export const facebookLoginSuccess = (
  data: ResponseFirebase
): IFacebookLoginSuccessAction => {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    payload: data,
  }
}

export const facebookLoginError = (
  err: ResponseFirebase
): IFacebookLoginFailedAction => {
  return {
    type: FACEBOOK_LOGIN_FAILED,
    payload: err,
  }
}
