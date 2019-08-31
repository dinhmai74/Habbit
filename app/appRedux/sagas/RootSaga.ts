import { watchUpdateRemainTasks } from "app/appRedux";
import { all } from "redux-saga/effects";
import {
  watchLogin,
  watchSignUp,
  watchGoogleLogin,
  watchFacebookLogin,
} from "./authentication";
import { watchCreateTask } from "./homeSagas/CreateTaskSaga";
import { watchDeleteTask } from "./homeSagas/DeleteTaskSaga";
import { watchEditTask } from "./homeSagas/EditTaskSaga";
import { watchFetchTasksData } from "./homeSagas/FetchTasksSaga";
import { watchFetchLifeLogData } from "./lifeLog/FetchLifeLogSaga";

export default function* rootSaga() {
  yield all([
    watchFetchTasksData(),
    watchLogin(),
    watchSignUp(),
    watchCreateTask(),
    watchDeleteTask(),
    watchFetchLifeLogData(),
    watchEditTask(),
    watchGoogleLogin(),
    watchFacebookLogin(),
    watchUpdateRemainTasks(),
  ]);
}
