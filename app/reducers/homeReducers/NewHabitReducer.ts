import { FETCH_TASKS_ALL, FETCH_TASKS_COMMIT, FETCH_TASKS_ROLLBACK } from '../../actions/ActionTypes/FetchTaskType';

const INITIAL_STATE: any = [

];

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_TASKS_ALL: {
      const result = {...action.payload}
      return result
    }
    case FETCH_TASKS_COMMIT: {
      const result = {...action.payload}
      return result
    }
    case FETCH_TASKS_ROLLBACK:
    return state

    default:
      return state
  }
}
