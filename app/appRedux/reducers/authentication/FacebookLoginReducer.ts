// @ts-nocheck
import {
  FACEBOOK_LOGIN,
  FACEBOOK_LOGIN_FAILED,
  FACEBOOK_LOGIN_SUCCESS,
  FacebookLoginAction,
} from "../../actions";
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
  action: FacebookLoginAction
): State => {
  switch (action.type) {
    case FACEBOOK_LOGIN:
      return {
        // @ts-ignore
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: true,
      };
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: false,
      };
    case FACEBOOK_LOGIN_FAILED:
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
