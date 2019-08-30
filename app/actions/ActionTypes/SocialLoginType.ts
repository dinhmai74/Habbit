// @ts-nocheck
import { ResponseFirebase } from "../../model";

export const FACEBOOK_LOGIN: "FACEBOOK_LOGIN" = "FACEBOOK_LOGIN";
export const FACEBOOK_LOGIN_SUCCESS: "FACEBOOK_LOGIN_SUCCESS" =
  "FACEBOOK_LOGIN_SUCCESS";
export const FACEBOOK_LOGIN_FAILED: "FACEBOOK_LOGIN_FAILED" =
  "FACEBOOK_LOGIN_FAILED";

export const GOOGLE_LOGIN: "GOOGLE_LOGIN" = "GOOGLE_LOGIN";
export const GOOGLE_LOGIN_SUCCESS: "GOOGLE_LOGIN_SUCCESS" =
  "GOOGLE_LOGIN_SUCCESS";
export const GOOGLE_LOGIN_FAILED: "GOOGLE_LOGIN_FAILED" = "GOOGLE_LOGIN_FAILED";

/*------------------------> Google <------------------------*/

export interface IGoogleLoginAction {
  type: typeof GOOGLE_LOGIN;
  resolve: Function;
  reject: Function;
}

export interface IGoogleLoginSuccessAction {
  type: typeof GOOGLE_LOGIN_SUCCESS;
  payload: ResponseFirebase;
}

export interface IGoogleLoginFailAction {
  type: typeof GOOGLE_LOGIN_FAILED;
  payload: ResponseFirebase;
}

/*------------------------> facebook <------------------------*/

export interface IFacebookLoginAction {
  type: typeof FACEBOOK_LOGIN;
  resolve: Function;
  reject: Function;
}

export interface IFacebookLoginSuccessAction {
  type: typeof FACEBOOK_LOGIN_SUCCESS;
  payload: ResponseFirebase;
}

export interface IFacebookLoginFailedAction {
  type: typeof FACEBOOK_LOGIN_FAILED;
  payload: ResponseFirebase;
}

/*------------------------> exports <------------------------*/

export type GoogleLoginAction =
  | IGoogleLoginAction
  | IGoogleLoginFailAction
  | IGoogleLoginSuccessAction;

export type FacebookLoginAction =
  | IFacebookLoginAction
  | IFacebookLoginFailedAction
  | IFacebookLoginSuccessAction;
