// @ts-nocheck
import { BASE_URL, getTokenString } from "app/api/firebase";
import { offlineActionCreator } from "../ActionCreator";
import { getRequestString } from "../ActionTypes";
import {
  DELETE_TASK,
  DELETE_TASK_FAIL,
  DELETE_TASK_SUCCESS,
} from "../ActionTypes/DeleteTask";

// @ts-ignore
export const deleteTask = (taskId: string) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

export const deleteTaskOfflineRequest = (taskId: string, token: string) => {
  return offlineActionCreator(
    `${BASE_URL}/deleteTask`,
    getRequestString(DELETE_TASK),
    taskId,
    { id: taskId },
    {
      method: "POST",
      body: JSON.stringify({ id: taskId }),
      headers: {
        "content-type": "application/json",
        "Authorization": getTokenString(token),
      },
    },
    {
      taskId,
    },
    {},
    true
  );
};

// @ts-ignore
export const deleteTaskSuccess = data => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: data,
  };
};

// @ts-ignore
export const deleteTaskFail = error => {
  return {
    type: DELETE_TASK_FAIL,
    payload: error,
  };
};
