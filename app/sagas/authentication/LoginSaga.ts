// @ts-nocheck
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'

// eslint-disable-next-line import/named
import { loginFailed, loginSuccess } from '../../actions'
import { LOGIN, ILoginRequestAction } from '../../actions/ActionTypes'
import { FirebaseWorker } from '../../api/firebase'

function* login(action: ILoginRequestAction) {
  try {
    try {
      {
        const result = yield FirebaseWorker.signIn(
          // @ts-ignore-end
          action.payload.email,
          // @ts-ignore-end
          action.payload.password,
        )

        if (result.error) {
          yield put(loginFailed(result))
          action.reject(result)
        } else {
          yield put(loginSuccess(result))
          action.resolve(result)
        }
      }
    } catch (error) {
      yield put(loginFailed(error))
      action.reject(error)
    }
  } catch (error) {
    yield put(loginFailed(error))
    action.reject(error)
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchLogin() {
  yield takeEvery(LOGIN, login)
}
