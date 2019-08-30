// @ts-nocheck
import {
  ISignUpAction,
  SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
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
export default (state: State = INITIAL_STATE, action: ISignUpAction): State => {
  switch (action.type) {
    case SIGN_UP:
      return {
        // @ts-ignore
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        data: action.payload,
        // @ts-ignore
        error: null,
        fetching: false,
      };
    case SIGN_UP_FAILED:
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
