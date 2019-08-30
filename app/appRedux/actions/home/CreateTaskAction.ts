// @flow
// @ts-nocheck
import Firebase from "react-native-firebase";
import firebase from "react-native-firebase";
import { v4 as generateUid } from "uuid";
import { BASE_URL, getTokenString } from "app/api/firebase";
import { TaskRawModel, ResponseFirebase } from "../../../model";
import { fillTask, fillTaskDaily } from "../../../tools";
import { offlineActionCreator } from "../ActionCreator";
import {
  Action,
  CREATE_TASK,
  CREATE_TASK_FAILED,
  CREATE_TASK_SUCCESS,
  getRequestString,
  ICreateTaskFailAction,
  ICreateTaskRequestAction,
  ICreateTaskSuccessAction,
} from "../ActionTypes";

// eslint-disable-next-line import/prefer-default-export
export const createTask = (task: TaskRawModel): Action => {
  return {
    type: CREATE_TASK,
    payload: task,
  };
};

export const createTaskOffline = (task: TaskRawModel, token: string = "") => {
  const { archived, createdDate, schedule } = task;

  if (schedule) {
    const { type } = schedule;
    task.archived = fillTask(type, archived, schedule.times, createdDate);
  }
  const id = generateUid();
  task.id = id;

  return offlineActionCreator(
    `${BASE_URL}/createTask`,
    CREATE_TASK,
    id,
    { task },
    {
      method: "POST",
      body: JSON.stringify({ task }),
      headers: {
        "content-type": "application/json",
        Authorization: getTokenString(token),
      },
    }
  );
};

export const createTaskSuccess = (
  data: ResponseFirebase
): ICreateTaskSuccessAction => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: data,
  };
};

export const createTaskFailed = (
  error: ResponseFirebase
): ICreateTaskFailAction => {
  return {
    type: CREATE_TASK_FAILED,
    payload: error,
  };
};
