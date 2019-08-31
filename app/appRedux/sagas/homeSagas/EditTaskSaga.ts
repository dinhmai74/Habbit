// @ts-nocheck
import { RemainTasksActions } from "app/appRedux";
import firebase from "react-native-firebase";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

// eslint-disable-next-line import/named
import {
  createTaskFailed,
  createTaskSuccess,
  fetchLifeLog,
  getRequestString,
} from "../../actions";
import {
  Action,
  CREATE_TASK,
  EDIT_STATUS_TASK,
} from "../../actions/ActionTypes";
import moment from "moment";

function* editTasks(action: Action) {
  try {
    yield put(fetchLifeLog(moment().toString()));
    yield put(RemainTasksActions.updateAllTasksRemain());
  } catch (error) {}
}

// eslint-disable-next-line import/prefer-default-export
export function* watchEditTask() {
  yield takeLatest(getRequestString(EDIT_STATUS_TASK), editTasks);
}
