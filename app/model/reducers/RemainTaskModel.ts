import { AnyAction } from "redux";

export interface RemainTaskModel {
  done: number;
  total: number;
}

export interface RemainTasks {
  daily: RemainTaskModel,
  weekly: RemainTaskModel,
  monthly: RemainTaskModel
}

export interface RemainTasksActionsCreators {
  updateAllTasksRemain: () => AnyAction
  updateDailyTasksRemain: () => AnyAction
  updateMonthlyTasksRemain: () => AnyAction
  updateWeeklyTasksRemain: () => AnyAction
}

export interface RemainTasksActionsTypes {
  UPDATE_ALL_TASKS_REMAIN
  UPDATE_MONTHLY_TASKS_REMAIN
  UPDATE_DAILY_TASKS_REMAIN
  UPDATE_WEEKLY_TASKS_REMAIN
}