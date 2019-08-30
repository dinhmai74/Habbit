// @ts-nocheck
import {
  GOOGLE_LOGIN,
  GOOGLE_LOGIN_FAILED,
  GOOGLE_LOGIN_SUCCESS,
  GoogleLoginAction,
} from "actions";
import { ResponseFirebase } from "model";

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
export default (
  // @ts-ignore
  state: State = INITIAL_STATE,
  action: GoogleLoginAction
): State => {
  switch (action.type) {
    case GOOGLE_LOGIN:
      return {
        // @ts-ignore
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: true,
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: false,
      };
    case GOOGLE_LOGIN_FAILED:
      return {
        // @ts-ignore
        data: null,
        error: action.payload,
        fetching: false,
      };
    default: {
      return state;
    }
  }
};
