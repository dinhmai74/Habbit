// @ts-nocheck
import {
  IGoogleLoginSuccessAction,
  IGoogleLoginFailAction,
  IGoogleLoginAction,
  GOOGLE_LOGIN_FAILED,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN,
} from "../ActionTypes";

import { ResponseFirebase } from "model";

// eslint-disable-next-line import/prefer-default-export
export const googleLogin = (
  resolve: Function,
  reject: Function
): IGoogleLoginAction => {
  return {
    type: GOOGLE_LOGIN,
    resolve,
    reject,
  };
};

export const googleLoginSuccess = (
  data: ResponseFirebase
): IGoogleLoginSuccessAction => {
  return {
    // @ts-ignore
    type: GOOGLE_LOGIN_SUCCESS,
    payload: data,
  };
};

export const googleLoginError = (
  err: ResponseFirebase
): IGoogleLoginFailAction => {
  return {
    type: GOOGLE_LOGIN_FAILED,
    payload: err,
  };
};
