import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from "reactotron-react-native";
import { offline } from "@redux-offline/redux-offline";
import logger from "redux-logger";
import promise from "redux-promise";
import offlineConfigDefault from "@redux-offline/redux-offline/lib/defaults";
import "../Reactotron/reactotronConfig";

import createSagaMiddleware from "redux-saga";
import reducers from "../appRedux/reducers/index";
import rootSaga from "../appRedux/sagas/RootSaga";
import getEffect from "./effect";

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const offlineConfig = {
  ...offlineConfigDefault,
  effect: (effect, action) => getEffect(effect, action),
  retry: (action, retries) => (action.meta.urgent ? 100 : 10000),
};

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  composeEnhancers(
    applyMiddleware(sagaMiddleware, logger),
    offline(offlineConfig)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
