// @ts-nocheck
import { Action } from "redux";
import { ITask } from "../../model";
import {
  FETCH_TASKS,
  FETCH_TASKS_ALL,
  FETCH_TASKS_COMMIT,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_ROLLBACK,
  FETCH_TASKS_SUCCESS,
  getRollbackString,
  IFetchTaskRequestAction,
  IRefetchTaskRequestAction,
  REFETCH_TASK,
} from "../ActionTypes";

export const fetchTasksAll = () => {
  return {
    type: FETCH_TASKS_ALL,
    payload: [],
    fetching: true,
    meta: {
      offline: {
        effect: {
          url:
            "https://us-central1-habit-74198.cloudfunctions.net/getTasks?uid=m1j9VWsYmIhqcwFM9eFAtJA3K6m1",
        },
        commit: { type: FETCH_TASKS_COMMIT },
        // action to dispatch if network action fails permanently:
        rollback: { type: FETCH_TASKS_ROLLBACK },
      },
    },
  };
};

export const fetchTasks = (
  resolve: Function,
  reject: Function
): IFetchTaskRequestAction => {
  return {
    type: FETCH_TASKS,
    resolve,
    reject,
  };
};

export const fetchTasksSuccess = (data: ITask[]): IFetchTaskRequestAction => ({
  // @ts-ignore
  type: FETCH_TASKS_SUCCESS,
  payload: data,
});

export const fetchTasksFail = (error: Object): IFetchTaskRequestAction => ({
  // @ts-ignore
  type: FETCH_TASKS_FAIL,
  payload: error,
});

export const refetchTasks = (
  resolve: Function = () => {},
  reject: Function = () => {}
): IRefetchTaskRequestAction => {
  return {
    type: REFETCH_TASK,
    resolve,
    reject,
  };
};

export const refetchTasksRollback = (): Action => {
  return {
    type: getRollbackString(REFETCH_TASK),
  };
};
