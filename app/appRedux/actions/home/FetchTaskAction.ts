// @ts-nocheck
import { Action } from "redux";
import { TaskDisplayModel } from "model";
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

export const fetchTasks = (
  resolve: () => void,
  reject: () => void
): IFetchTaskRequestAction => {
  return {
    type: FETCH_TASKS,
    resolve,
    reject,
  };
};

export const fetchTasksSuccess = (
  data: TaskDisplayModel[]
): IFetchTaskRequestAction => ({
  // @ts-ignore
  type: FETCH_TASKS_SUCCESS,
  payload: data,
});

export const fetchTasksFail = (error): IFetchTaskRequestAction => ({
  // @ts-ignore
  type: FETCH_TASKS_FAIL,
  payload: error,
});

export const refetchTasks = (
  resolve: () => void,
  reject: () => void
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
