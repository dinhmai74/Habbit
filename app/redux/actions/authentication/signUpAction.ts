// @ts-nocheck
import {
  ISignUpFailed,
  ISignUpRequestAction,
  ISignUpSuccessAction,
  SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
} from "../ActionTypes";

import { ResponseFirebase, TypeUser } from "../../model";

// eslint-disable-next-line import/prefer-default-export
export const signUp = (
  user: TypeUser,
  resolve: Function,
  reject: Function
): ISignUpRequestAction => {
  return {
    type: SIGN_UP,
    // @ts-ignore
    payload: user,
    resolve,
    reject,
  };
};

export const signUpSuccess = (data: ResponseFirebase): ISignUpSuccessAction => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data,
  };
};

export const signUpFailed = (err: ResponseFirebase): ISignUpFailed => {
  return {
    type: SIGN_UP_FAILED,
    payload: err,
  };
};
