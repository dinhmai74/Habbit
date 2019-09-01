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
  let dailyTask: TaskLifelogModel[] = [];
  if (tasks) {
    dailyTask = _.filter(tasks, (e: TaskLifelogModel) => {
      if (e.schedule) {
        const { type } = e.schedule;
        if (type === "daily" || type === "weekly") {
          return true;
        }
      }
      return false;
    });

    const startWeek = moment().startOf("isoWeek");
    const endWeek = moment().endOf("isoWeek");

    console.log(`%c startWeek`, `color: blue; font-weight: 600`, startWeek);
    console.log(`%c endWeek`, `color: blue; font-weight: 600`, endWeek);

    dailyTask = _.forEach(dailyTask, task => {
      let total = 0;
      let done = 0;

      _.forEach(task.archived, archive => {
        if (isInWeek(moment(archive.date), startWeek, endWeek)) {
          total++;
          if (archive.status === "done") {
            done++;
          }
        }
        task.done = done;
        task.total = total;
      });
    });
  }
  return Immutable.merge(state, {
    weekly: {
      tasks: dailyTask,
    },
  });
};

const isInWeek = (date: Moment, startWeek: Moment, endWeek: Moment) => {
  return date.isAfter(startWeek, "date") && date.isBefore(endWeek, "date");
};

const updateMonthlyReducer = (state): RemainTasks => {
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

function* doUpdateCall() {
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
