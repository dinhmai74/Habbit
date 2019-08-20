// @ts-nocheck
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'

// eslint-disable-next-line import/named
import firebase from 'react-native-firebase'
import {
  deleteTaskFail,
  deleteTaskOfflineRequest,
  deleteTaskSuccess,
} from '../../actions'
import { Action, DELETE_TASK } from '../../actions/ActionTypes'

function* deleteTask(action: Action) {
  const user = yield firebase.auth().currentUser
  const token = yield user.getIdToken()
  console.log(`%c action`,'color: blue; font-weight: 600',action)
  try {
    yield put(deleteTaskOfflineRequest(action.payload, token))
  } catch (e) {
    yield put(deleteTaskFail(e))
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK, deleteTask)
}
