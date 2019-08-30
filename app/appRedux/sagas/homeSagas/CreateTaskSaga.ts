// @ts-nocheck
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

// eslint-disable-next-line import/named
import firebase from "react-native-firebase";
import {
  createTaskFailed,
  createTaskOffline,
  createTaskSuccess,
} from "../../actions";
import { Action, CREATE_TASK } from "../../actions/ActionTypes";
import { FirebaseWorker } from "app/api/firebase";

function* createTask(action: Action) {
  const user = yield firebase.auth().currentUser;
  const token = yield user.getIdToken();
  try {
    yield put(createTaskOffline(action.payload, token));
  } catch (e) {
    yield put(createTaskFailed(e));
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchCreateTask() {
  yield takeEvery(CREATE_TASK, createTask);
}
