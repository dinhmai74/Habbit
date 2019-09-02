import {
  RemainTasksActions,
  fetchLifeLog,
  getRequestString,
  Action,
  EDIT_STATUS_TASK,
} from "app/appRedux";
import { put, takeLatest } from "redux-saga/effects";

import moment from "moment";

function* editTasks(action: Action) {
  try {
    yield put(fetchLifeLog(moment().toString()));
    yield put(RemainTasksActions.updateAllTasksRemain());
  } catch (error) {}
}

// eslint-disable-next-line import/prefer-default-export
export function* watchEditTaskRequest() {
  yield takeLatest(getRequestString(EDIT_STATUS_TASK), editTasks);
}
