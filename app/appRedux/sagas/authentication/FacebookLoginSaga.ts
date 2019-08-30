import { call, put } from "redux-saga/effects";
import _ from "lodash";
import { facebookLoginError, facebookLoginSuccess } from "../../actions";
import {
  FACEBOOK_LOGIN,
  IFacebookLoginAction,
} from "../../actions/ActionTypes";
import { FirebaseWorker } from "app/api/firebase";
import { takeLeading } from "app/tools";

function* facebookSigninListener(action: IFacebookLoginAction) {
  const { reject, resolve } = action;
  try {
    const result = yield call(FirebaseWorker.loginByFacebook);
    if (result.error) {
      throw result;
    } else {
      yield put(facebookLoginSuccess(result));
      _.isFunction(resolve) && resolve(result);
    }
  } catch (error) {
    yield put(facebookLoginError(error));
    _.isFunction(reject) && reject(error);
  }
}

export function* watchFacebookLogin() {
  yield takeLeading(FACEBOOK_LOGIN, facebookSigninListener);
}
