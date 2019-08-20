// @flow
// @ts-nocheck
import { BASE_URL } from '../../api/firebase'
import { IIconHabit, ISchedule, TArchivedStatus } from '../../model'
import { offlineActionCreator } from '../ActionCreator'
import {
  Action,
  EDIT_ICON_NAME_TASK,
  EDIT_SCHEDULE_TASK,
  EDIT_STATUS_TASK,
  getRequestString,
} from '../ActionTypes'
import { IEditTaskRequestAction, IFetchTaskRequestAction } from '../ActionTypes'

export const editTaskStatus = (
  taskId: string,
  status: TArchivedStatus,
  date: string,
  token: string,
): Action =>
  offlineActionCreator(
    `${BASE_URL}/editTaskStatus`,
    EDIT_STATUS_TASK,
    taskId,
    {
      taskId,
      status,
      date,
    },
    {
      method: 'POST',
      body: JSON.stringify({
        taskId,
        status,
        date,
      }),
      headers: {
        'content-type': 'application/json',
        "token": token,
      },
    },
  )

export const editTaskIconAndName = (
  taskId: string,
  quest: string,
  icon: IIconHabit,
  token: string,
): Action =>
  offlineActionCreator(
    `${BASE_URL}/editIconAndName`,
    EDIT_ICON_NAME_TASK,
    taskId,
    { taskId, quest, icon },
    {
      method: 'POST',
      body: JSON.stringify({
        taskId,
        icon,
        taskQuest: quest,
      }),
      headers: {
        'content-type': 'application/json',
        "token": token,
      },
    },
  )

export const editSchedule = (
  taskId: string,
  schedule: ISchedule,
  token: string,
): Action =>
  offlineActionCreator(
    `${BASE_URL}/editSchedule`,
    EDIT_SCHEDULE_TASK,
    taskId,
    { taskId, schedule },
    {
      method: 'POST',
      body: JSON.stringify({
        taskId,
        schedule,
      }),
      headers: {
        'content-type': 'application/json',
        "token": token,
      },
    },
  )
