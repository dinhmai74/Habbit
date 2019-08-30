// @ts-nocheck
import {
  FETCH_LIFE_LOG,
  FETCH_LIFE_LOG_FAIL,
  FETCH_LIFE_LOG_SUCCESS,
} from "../../actions/ActionTypes";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
};

// @ts-ignore
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIFE_LOG: {
      return {
        data: null,
        error: null,
        fetching: true,
      };
    }
    case FETCH_LIFE_LOG_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        fetching: false,
      };
    }
    case FETCH_LIFE_LOG_FAIL: {
      return {
        data: null,
        error: action.payload,
        fetching: false,
      };
    }
    default:
      return state;
  }
};
