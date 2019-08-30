// @ts-nocheck
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

// eslint-disable-next-line import/named
import { signUpFailed, signUpSuccess } from "../../actions";
import { ISignUpAction, SIGN_UP } from "../../actions/ActionTypes";
import { FirebaseWorker } from "../../api/firebase";

function* signUp(action: ISignUpAction) {
  try {
    try {
      {
        const result = yield FirebaseWorker.createUser(
          // @ts-ignore-end
          action.payload.email,
          // @ts-ignore-end
          action.payload.password,
          // @ts-ignore-end
          action.payload.userName
        );

        if (result.error) {
          yield put(signUpFailed(result));
          // @ts-ignore-end
          action.reject(result);
        } else {
          yield put(signUpSuccess(result));
          // @ts-ignore-end
          action.resolve(result);
        }
      }
    } catch (error) {
      yield put(signUpFailed(error));
      // @ts-ignore-end
      action.reject(error);
    }
  } catch (error) {
    yield put(signUpFailed(error));
    // @ts-ignore-end
    action.reject(error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchSignUp() {
  // @ts-ignore-end
  yield fork(takeEvery, SIGN_UP, signUp);
}
