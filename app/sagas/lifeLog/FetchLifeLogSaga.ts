// @ts-nocheck
import { takeLatest, put, call, fork, takeEvery } from 'redux-saga/effects'
import firebase, { Firebase } from 'react-native-firebase'

import { FETCH_LIFE_LOG, Action, REFETCH_TASK } from '../../actions/ActionTypes'
// eslint-disable-next-line import/named
import { fetchLifeLogSuccess, fetchLifeLogFail } from '../../actions'
import FirebaseWorker from '../../api/firebase'

function* fetchLifeLogFromFirebase(action: Action) {
  try {
    try {
      {
        const tasks = yield FirebaseWorker.getLifeLogStat(action.payload)
        if (tasks.error) {
          yield put(fetchLifeLogFail(tasks.message))
        } else {
          yield put(fetchLifeLogSuccess(tasks.data.data))
        }
      }
    } catch (error) {
      yield put(fetchLifeLogFail(error))
    }
  } catch (error) {
    yield put(fetchLifeLogFail(error))
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchFetchLifeLogData() {
  yield takeLatest(FETCH_LIFE_LOG, fetchLifeLogFromFirebase)
}
