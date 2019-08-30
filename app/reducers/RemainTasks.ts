import { fetchLifeLogFail, fetchLifeLogSuccess } from "app/actions";
import { Action, FETCH_LIFE_LOG } from "app/actions/ActionTypes";
import FirebaseWorker from "app/api/firebase";
import { RemainTaskModel, RemainTasks, RemainTasksActionsCreators, RemainTasksActionsTypes } from "model";
import { put, takeLatest } from "redux-saga/effects";
import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<RemainTasksActionsTypes, RemainTasksActionsCreators>({
  updateAllTasksRemain: null,
});

export const RemainTasksType = Types;
export default Creators;
export const RemainTasksActions= Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: RemainTasks = Immutable({
  daily: {
    done: 0,
    total: 0,
  } as RemainTaskModel,
  weekly: {
    done: 0,
    total: 0,
  } as RemainTaskModel,
  monthly: {
    done: 0,
    total: 0,
  } as RemainTaskModel,
});

/* ------------- Reducers ------------- */
const updateAllTaskReducer = (state): RemainTasks => {
  return state;
};

const updateDailyTaskReducer =(state,)

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.UPDATE_ALL_TASKS_REMAIN]: updateAllTaskReducer,
  [Types.UPDATE_DAILY_TASKS_REMAIN]: updateDailyTaskReducer,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

/* ------------- Sagas ------------- */
function* doUpdateCall(action: Action) {
  try {
    try {
      {
        const tasks = yield FirebaseWorker.getLifeLogStat(action.payload);
        if (tasks.error) {
          yield put(fetchLifeLogFail(tasks.message));
        } else {
          yield put(fetchLifeLogSuccess(tasks.data.data));
        }
      }
    } catch (error) {
      yield put(fetchLifeLogFail(error));
    }
  } catch (error) {
    yield put(fetchLifeLogFail(error));
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchUpdateRemainTasks() {
  yield takeLatest(Types.UPDATE_ALL_TASKS_REMAIN, doUpdateCall);
}

