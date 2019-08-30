// @ts-nocheck
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LoginAction,
} from "../../actions/ActionTypes";
import { ResponseFirebase } from "../../model";

const INITIAL_STATE = {
  data: null,
  error: null,
  fetching: false,
};

interface State {
  data: ResponseFirebase;
  error: ResponseFirebase;
  fetch: boolean;
}

// @ts-ignore
export default (state: State = INITIAL_STATE, action: LoginAction): State => {
  switch (action.type) {
    case LOGIN:
      return {
        // @ts-ignore
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: false,
      };
    case LOGIN_FAILED:
      return {
        // @ts-ignore
        data: null,
        error: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
