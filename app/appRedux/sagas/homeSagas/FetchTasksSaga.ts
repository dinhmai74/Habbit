// @ts-nocheck
import firebase, { Firebase } from "react-native-firebase";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

// eslint-disable-next-line import/named
import {
  fetchTasksFail,
  fetchTasksSuccess,
  refetchTasksRollback,
} from "../../actions";
import { Action, FETCH_TASKS, REFETCH_TASK } from "../../actions/ActionTypes";
import FirebaseWorker from "app/api/firebase";

function* fetchTasksFromFirebase(action: Action) {
  try {
    try {
      {
        const tasks = yield FirebaseWorker.getTasks();
        if (tasks.error) {
          yield put(fetchTasksFail(tasks.message));
          // @ts-ignore
          yield action.reject(tasks.message);
        } else {
          yield put(fetchTasksSuccess(tasks.data));
          // @ts-ignore
          yield action.resolve(tasks.data);
        }
      }
    } catch (error) {
      yield put(fetchTasksFail(error));
      // @ts-ignore
      action.reject(error);
    }
  } catch (error) {
    yield put(fetchTasksFail(error));
    // @ts-ignore
    action.reject(error);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchFetchTasksData() {
  yield takeLatest(FETCH_TASKS, fetchTasksFromFirebase);
}
