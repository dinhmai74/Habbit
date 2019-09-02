// @ts-nocheck
import _ from "lodash";
import {
  CREATE_TASK,
  CREATE_TASK_FAILED,
  CREATE_TASK_SUCCESS,
  EDIT_ICON_NAME_TASK,
  EDIT_SCHEDULE_TASK,
  EDIT_STATUS_TASK,
  FETCH_TASKS,
  FETCH_TASKS_ALL,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  getCommitString,
  getRequestString,
  getRollbackString,
  REFETCH_TASK,
  Action,
  DELETE_TASK,
} from "../../actions";

import { NetInfo } from "react-native";
import { FirebaseWorker } from "app/api/firebase";
// import { TypeHabitRawItem } from 'app/model';
import { TaskRawModel, ArchivedTaskModel } from "../../../model";

const INITIAL_STATE = {
  data: [],
  error: null,
  fetching: false,
};

interface State {
  data: TaskRawModel[] | null;
  error: object | null;
  fetching: boolean;
}

const editTask = (
  oldTasks: TaskRawModel[],
  taskEdit: { taskId: string; date: string; status: ArchivedTaskModel },
): TaskRawModel[] => {
  FirebaseWorker.updateArchived(
    taskEdit.taskId,
    taskEdit.status,
    taskEdit.date,
  );
  const { taskId, date, status } = taskEdit;
  const taskNeedEdit: any = _.filter(oldTasks, (value: any) => {
    return value.id === taskId;
  });
  if (taskNeedEdit.length > 0) {
    taskNeedEdit[0].archived[date].status = status;
  }
  return oldTasks;
};

const editIconAndName = (oldTasks: TaskRawModel[], newTask) => {
  const cloneOldTask = [...oldTasks];
  const taskNeedEdit: any = _.filter(cloneOldTask, (value: any) => {
    return value.id === newTask.taskId;
  });
  if (taskNeedEdit.length > 0) {
    const { quest, icon } = newTask;
    if (quest) {
      taskNeedEdit[0].quest = quest;
    }
    if (icon && icon.name && icon.color) {
      taskNeedEdit[0].icon = icon;
    }
  }
  return cloneOldTask;
};

const deleteTask = (oldTasks: any, taskId: string) => {
  const newTasks = _.filter(oldTasks, (value: { id: string }) => {
    return value.id !== taskId;
  });
  return [...newTasks];
};

const createTask = (
  oldTask: TaskRawModel[],
  newTask: TaskRawModel,
): TaskRawModel[] => {
  return [...oldTask, newTask];
};

const editSchedule = (oldTasks: TaskRawModel[], newTask: any) => {
  console.log(`%c oldTasks`, `color: blue; font-weight: 600`, oldTasks);
  console.log(`%c newTask`, `color: blue; font-weight: 600`, newTask);
  const cloneOldTask = [...oldTasks];
  const taskNeedEdit: any = _.filter(cloneOldTask, (value: any) => {
    return value.id === newTask.taskId;
  });

  if (taskNeedEdit.length > 0) {
    const { schedule } = newTask;
    taskNeedEdit[0].schedule = schedule;
  }
  return [...cloneOldTask];
};

const editTaskStatus = (oldTasks: TaskRawModel[], newTask: any) => {
  const cloneOldTask = [...oldTasks];
  const taskNeedEdit: any = _.filter(cloneOldTask, (value: any) => {
    return value.id === newTask.taskId;
  });

  if (taskNeedEdit.length > 0) {
    const { status, date } = newTask;
    taskNeedEdit[0].archived[date].status = status;
  }
  return [...cloneOldTask];
};

export default (state: any = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case getRequestString(CREATE_TASK):
      const newState = createTask(state.data, action.payload.task);
      return {
        data: newState,
        error: null,
        fetching: false,
      };

    case getRollbackString(CREATE_TASK):
      return {
        ...state,
      };

    case getCommitString(CREATE_TASK):
      return {
        ...state,
      };

    case CREATE_TASK: {
      // const result = createTask(state.data || [], action.payload)
      return {
        ...state,
        fetching: true,
      };
    }

    case CREATE_TASK_SUCCESS: {
      const result = createTask(state.data || [], action.payload);
      return {
        data: result,
        error: null,
        fetching: false,
      };
    }

    case CREATE_TASK_FAILED:
      return {
        data: null,
        error: action.payload,
        fetching: false,
      };

    case EDIT_STATUS_TASK: {
      const result = editTask(state.data, action.payload);
      return {
        ...state,
        data: result,
      };
    }

    case FETCH_TASKS:
      return {
        error: null,
        fetching: true,
        ...state,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        data: action.payload,
        error: null,
        fetching: false,
      };
    case FETCH_TASKS_FAIL:
      return {
        error: action.payload,
        fetching: false,
        ...state,
      };
    case DELETE_TASK: {
      const result = deleteTask(state.data, action.payload);
      return {
        ...state,
        data: result,
      };
    }

    case getRequestString(DELETE_TASK): {
      const result = deleteTask(state.data, action.payload);
      return {
        ...state,
        data: result,
      };
    }

    case getCommitString(DELETE_TASK): {
      const result = deleteTask(state.data, action.payload);
      return {
        ...state,
        data: result,
      };
    }

    case getRequestString(EDIT_ICON_NAME_TASK): {
      const newState = editIconAndName(state.data, action.payload);
      return {
        ...state,
        data: newState,
      };
    }

    case getCommitString(EDIT_ICON_NAME_TASK): {
      const newState = editIconAndName(state.data, action.payload);
      return {
        ...state,
        data: newState,
      };
    }

    case getRollbackString(EDIT_ICON_NAME_TASK):
      return state;

    case REFETCH_TASK: {
      return {
        ...state,
        error: null,
        fetching: false,
      };
    }
    case getRequestString(EDIT_SCHEDULE_TASK): {
      const newState = editSchedule(state.data, action.payload);
      return Object.assign({}, { ...state }, { data: newState });
    }

    case getCommitString(EDIT_SCHEDULE_TASK): {
      return {
        ...state,
        error: true,
        fetching: false,
      };
    }

    case getRollbackString(EDIT_SCHEDULE_TASK): {
      return state;
    }

    case getRequestString(EDIT_STATUS_TASK): {
      const newState = editTaskStatus(state.data, action.payload);
      return {
        ...state,
        data: newState,
      };
    }

    default:
      return state;
  }
};
