import {
  FETCH_LIFE_LOG,
  FETCH_LIFE_LOG_FAIL,
  FETCH_LIFE_LOG_SUCCESS,
} from '../ActionTypes'

export const fetchLifeLog = (month: string) => {
  return {
    type: FETCH_LIFE_LOG,
    payload: month,
  }
}

export const fetchLifeLogSuccess = (data: any) => {
  return {
    type: FETCH_LIFE_LOG_SUCCESS,
    payload: data,
  }
}

export const fetchLifeLogFail = (error: any) => {
  return {
    type: FETCH_LIFE_LOG_FAIL,
    payload: error,
  }
}
