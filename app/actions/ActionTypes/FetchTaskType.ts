// @flow
import { TaskDisplayModel } from "../../model";

export const REFETCH_TASK: "REFETCH_TASK" = "REFETCH_TASK";
export const FETCH_TASKS: "FETCH_TASKS" = "FETCH_TASKS";
export const FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS" = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAIL: "FETCH_TASKS_FAIL" = "FETCH_TASKS_FAIL";
export const FETCH_TASKS_ALL: "FETCH_TASKS_ALL" = "FETCH_TASKS_ALL";
export const FETCH_TASKS_COMMIT: "FETCH_TASKS_COMMIT" = "FETCH_TASKS_COMMIT";
export const FETCH_TASKS_ROLLBACK: "FETCH_TASKS_ROLLBACK" =
  "FETCH_TASKS_ROLLBACK";

export interface IFetchTaskRequestAction {
  type: typeof FETCH_TASKS;
  resolve: Function;
  reject: Function;
}

export interface IFetchTaskFailAction {
  type: typeof FETCH_TASKS_FAIL;
  payload: object;
}

export interface IFetchTaskSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS;
  payload: TaskDisplayModel[];
}

export interface IRefetchTaskRequestAction {
  type: typeof REFETCH_TASK;
  resolve: Function;
  reject: Function;
}

export interface IFetchAllTasksAction {
  type: typeof FETCH_TASKS_ALL;
  payload: any[];
  meta: {
    effect: any;
    commit: any;
    rollback?: any;
  };
}

export type FetchTaskAction =
  | IFetchTaskRequestAction
  | IFetchTaskFailAction
  | IFetchTaskSuccessAction
  | IRefetchTaskRequestAction;
