// @ts-nocheck
import { ResponseFirebase } from "model";

export const LOGIN: "LOGIN" = "LOGIN";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const SIGN_UP: "SIGN_UP" = "SIGN_UP";
export const SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS" = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED: "SIGN_UP_FAILED" = "SIGN_UP_FAILED";

export interface ILoginRequestAction {
  type: typeof LOGIN;
  resolve: Function;
  reject: Function;
}

export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: ResponseFirebase;
}

export interface ILoginFailAction {
  type: typeof LOGIN_FAILED;
  payload: ResponseFirebase;
}

export interface ISignUpRequestAction {
  type: typeof SIGN_UP;
  resolve: Function;
  reject: Function;
}

export interface ISignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
  payload: ResponseFirebase;
}

export interface ISignUpFailed {
  type: typeof SIGN_UP_FAILED;
  payload: ResponseFirebase;
}
export type LoginAction =
  | ILoginRequestAction
  | ILoginFailAction
  | ILoginSuccessAction;

export type ISignUpAction =
  | ISignUpRequestAction
  | ISignUpFailed
  | ISignUpSuccessAction;
