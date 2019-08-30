// @ts-nocheck
import firebase from "react-native-firebase";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

// eslint-disable-next-line import/named
import { createTaskFailed, createTaskSuccess } from "../../actions";
import {
  Action,
  CREATE_TASK,
  EDIT_STATUS_TASK,
} from "../../actions/ActionTypes";
import { FirebaseWorker } from "app/api/firebase";
import I18n from "localization";
import { strings } from "themes";

function* editTasks(action: Action) {
  try {
    if (firebase.auth().currentUser !== null) {
      const user = firebase.auth().currentUser;
    } else {
      throw { error: I18n.t(strings.errMessYouMustSignIn) };
    }
  } catch (error) {}
}

// eslint-disable-next-line import/prefer-default-export
export function* watchEditTask() {
  yield takeLatest(EDIT_STATUS_TASK, editTasks);
}
