import {
  countTheDoneTasksInToday,
  filterTodayTasks,
  getTaskBaseOnType,
  getTheMonthlyTasks,
  mapDoneAndTotalStatus,
  mapDoneAndTotalStatusForDailyTasks,
} from "app/appRedux/reducers/RemainTasksReducer/RemainTasksReducer.helper";
import _ from "lodash";
import {
  RemainTaskModel,
  RemainTasks,
  RemainTasksActionsCreators,
  RemainTasksActionsTypes,
  TaskRawModel,
  RemainTaskWeekAndMonthModel,
  TaskLifelogModel,
} from "model";
import moment, { Moment } from "moment";
import { AnyAction } from "redux";
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
  updateTodayTasksRemain: ["tasks"],
  updateDailyTasksRemain: ["tasks"],
  updateMonthlyTasksRemain: ["tasks"],
  updateWeeklyTasksRemain: ["tasks"],
});

export const RemainTasksType = Types;
export default Creators;
export const RemainTasksActions = { ...Creators };

/* ------------- Initial State ------------- */
export const INITIAL_STATE: RemainTasks = Immutable({
  today: {
    done: 0,
    total: 0,
  } as RemainTaskModel,
  daily: {
    tasks: [],
  } as RemainTaskWeekAndMonthModel,
  weekly: {
    tasks: [],
  } as RemainTaskWeekAndMonthModel,
  monthly: {
    tasks: [],
  } as RemainTaskWeekAndMonthModel,
});

/* ------------- Reducers ------------- */
const updateAllTaskReducer = (state): RemainTasks => {
  return state;
};

const updateTodayTaskReducer = (state, action: AnyAction): RemainTasks => {
  const { tasks } = action;
  const today: RemainTaskModel = {
    done: 0,
    total: 0,
  };
  if (tasks) {
    let todayTasks = [...tasks];
    todayTasks = filterTodayTasks(todayTasks);
    let done = 0;
    done = countTheDoneTasksInToday(todayTasks, done);

    today.total = todayTasks.length;
    today.done = done;
  }
  return Immutable.merge(state, { today });
};

const updateDailyTaskReducer = (state, action): RemainTasks => {
  const { tasks } = action;
  let dailyTasks: TaskLifelogModel[] = [];
  if (tasks) {
    dailyTasks = getTaskBaseOnType(tasks, "daily");
    dailyTasks = mapDoneAndTotalStatusForDailyTasks(dailyTasks);
  }
  return Immutable.merge(state, {
    daily: {
      tasks: dailyTasks,
    },
  });
};

const updateWeeklyReducer = (state, action): RemainTasks => {
  const { tasks } = action;
  let weeklyTask: TaskLifelogModel[] = [];
  if (tasks) {
    weeklyTask = getTaskBaseOnType(tasks, "weekly");

    weeklyTask = mapDoneAndTotalStatus(weeklyTask, "week");
  }
  return Immutable.merge(state, {
    weekly: {
      tasks: weeklyTask,
    },
  });
};

const updateMonthlyReducer = (state, action): RemainTasks => {
  const { tasks } = action;
  let monthlyTask: TaskLifelogModel[] = [];
  if (tasks) {
    monthlyTask = getTaskBaseOnType(tasks, "monthly");

    monthlyTask = mapDoneAndTotalStatus(monthlyTask, "month");
  }
  return Immutable.merge(state, {
    monthly: {
      tasks: monthlyTask,
    },
  });
};

/* ------------- Hookup Reducers To Types ------------- */

const HANDLERS = {
  [Types.UPDATE_TODAY_TASKS_REMAIN]: updateTodayTaskReducer,
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
const getAllTasksFromStore = state => state.tasks;

function* doUpdateCall() {
  try {
    const tasks = yield select(getAllTasksFromStore);
    yield put(Creators.updateDailyTasksRemain(tasks.data));
    yield put(Creators.updateTodayTasksRemain(tasks.data));
    yield put(Creators.updateWeeklyTasksRemain(tasks.data));
    yield put(Creators.updateMonthlyTasksRemain(tasks.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* watchUpdateRemainTasks() {
  yield takeLatest(Types.UPDATE_ALL_TASKS_REMAIN, doUpdateCall);
}
