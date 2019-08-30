import { call, put } from "redux-saga/effects";
import _ from "lodash";
import { googleLoginError, googleLoginSuccess } from "../../actions";
import { GOOGLE_LOGIN, IGoogleLoginAction } from "../../actions/ActionTypes";
import { FirebaseWorker } from "app/api/firebase";
import { takeLeading } from "app/tools";

function* googleLoginListener(action: IGoogleLoginAction) {
  const { reject, resolve } = action;
  try {
    const result = yield call(FirebaseWorker.googleLogin);
    if (result.error) {
      throw result;
    } else {
      yield put(googleLoginSuccess(result));
      _.isFunction(resolve) && resolve(result);
    }
  } catch (error) {
    yield put(googleLoginError(error));
    _.isFunction(reject) && reject(error);
  }
}

export function* watchGoogleLogin() {
  yield takeLeading(GOOGLE_LOGIN, googleLoginListener);
}
