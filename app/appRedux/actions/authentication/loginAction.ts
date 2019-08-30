// @ts-nocheck
import {
  ICreateTaskSuccessAction,
  ILoginFailAction,
  ILoginRequestAction,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../ActionTypes";

import { ResponseFirebase, TypeUser } from "model";

// eslint-disable-next-line import/prefer-default-export
export const login = (
  user: TypeUser,
  resolve: Function,
  reject: Function
): ILoginRequestAction => {
  return {
    type: LOGIN,
    // @ts-ignore
    payload: user,
    resolve,
    reject,
  };
};

export const loginSuccess = (
  data: ResponseFirebase
): ICreateTaskSuccessAction => {
  return {
    // @ts-ignore
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = (err: ResponseFirebase): ILoginFailAction => {
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
};
