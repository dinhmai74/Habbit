import { fork, take, call } from "redux-saga/effects";

/**
 * https://github.com/redux-saga/redux-saga/tree/master/docs/api#takeeverypattern-saga-args
 * purpose: take only first action <> takeLatest
 * @param {*} patternOrChannel
 * @param {*} saga
 * @param  {...any} args
 */
export const takeLeading = (patternOrChannel: any, saga: any, ...args: any[]) =>
  fork(function*() {
    while (true) {
      const action = yield take(patternOrChannel);
      // @ts-ignore
      yield call(saga, ...args.concat(action));
    }
  });
