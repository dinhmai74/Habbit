import { Action, offlineActionCreator } from "app/appRedux/actions";
import _ from "lodash";
import {
  RemainTaskModel,
  RemainTasks,
  RemainTasksActionsCreators,
  RemainTasksActionsTypes,
  TaskRawModel,
} from "model";
import moment from "moment";
import { AnyAction, combineReducers } from "redux";
import { put, select, takeLatest } from "redux-saga/effects";
import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

import { strings } from "app/themes";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<
  RemainTasksActionsTypes,
  RemainTasksActionsCreators
>({
  updateAllTasksRemain: null,
  updateDailyTasksRemain: ["tasks"],
  updateMonthlyTasksRemain: ["tasks"],
  updateWeeklyTasksRemain: ["tasks"],
});

export const RemainTasksType = Types;
export default Creators;
export const RemainTasksActions = { ...Creators };

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

const updateDailyTaskReducer = (state, action: AnyAction): RemainTasks => {
  const { tasks } = action;
  const daily: RemainTaskModel = {
    done: 0,
    total: 0,
  };
  if (tasks) {
    let todayTasks = [...tasks];
    todayTasks = _.filter(todayTasks, (task: TaskRawModel) => {
      let result = 0;
      _.forEach(task.archived, arc => {
        if (moment(arc.date).isSame(moment(), "day")) {
          result++;
        }
      });

      return result > 0;
    });
    todayTasks.sort();
    let done = 0;

    _.forEach(todayTasks, task => {
      if (
        task.archived[moment().format(strings.format.date)].status === "done"
      ) {
        done += 1;
      }
    });

    daily.total = todayTasks.length;
    daily.done = done;
  }
  return Immutable.merge(state, { daily });
};

const updateWeeklyReducer = (state, action): RemainTasks => {
  const { tasks } = action;
  const weekly: RemainTaskModel = {
    done: 0,
    total: 0,
  };
  if (tasks) {
    const dailyTask: TaskRawModel[] = _.filter(tasks, (e: TaskRawModel) => {
      if (e.schedule) {
        const { type } = e.schedule;
        if (type === "daily" || type === "weekly") {
          return true;
        }
      }
      return false;
    });

    console.log(`%c dailyTask`, `color: blue; font-weight: 600`, dailyTask);
  }
  return state;
};

const updateMonthlyReducer = (state, action): RemainTasks => {
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.UPDATE_DAILY_TASKS_REMAIN]: updateDailyTaskReducer,
  [Types.UPDATE_WEEKLY_TASKS_REMAIN]: updateWeeklyReducer,
  [Types.UPDATE_MONTHLY_TASKS_REMAIN]: updateMonthlyReducer,
  [Types.UPDATE_ALL_TASKS_REMAIN]: updateAllTaskReducer,
};

export const reducer = createReducer<RemainTasks, AnyAction>(
  INITIAL_STATE,
  HANDLERS
);

/* ------------- Sagas ------------- */
const getAllTasks = state => state.tasks;

function* doUpdateCall(action: Action) {
  try {
    const tasks = yield select(getAllTasks);
    yield put(Creators.updateDailyTasksRemain(tasks.data));
    yield put(Creators.updateWeeklyTasksRemain(tasks.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* watchUpdateRemainTasks() {
  yield takeLatest(Types.UPDATE_ALL_TASKS_REMAIN, doUpdateCall);
}
