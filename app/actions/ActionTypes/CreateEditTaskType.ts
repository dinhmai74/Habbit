import { IHabitRawItem, ResponseFirebase, TArchivedStatus } from '../../model'

export const EDIT_STATUS_TASK: 'EDIT_STATUS_TASK' = 'EDIT_STATUS_TASK'
export const EDIT_SCHEDULE_TASK: 'EDIT_SCHEDULE_TASK' = 'EDIT_SCHEDULE_TASK'
export const EDIT_ICON_NAME_TASK = 'EDIT_ICON_NAME_TASK'
export const CREATE_TASK: 'CREATE_TASK' = 'CREATE_TASK'
export const CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS' = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_FAILED: 'CREATE_TASK_FAILED' = 'CREATE_TASK_FAILED'

export interface IEditTaskRequestAction {
  type: 'EDIT_STATUS_TASK_REQUEST'
  payload: {
    taskId: string
    status: TArchivedStatus
    date: string,
  }
}

export type EditTaskAction = IEditTaskRequestAction

export interface ICreateTaskRequestAction {
  type: typeof CREATE_TASK
  payload: IHabitRawItem
}

export interface ICreateTaskFailAction {
  type: typeof CREATE_TASK_FAILED
  payload: ResponseFirebase
}

export interface ICreateTaskSuccessAction {
  type: typeof CREATE_TASK_SUCCESS
  payload: ResponseFirebase
}
