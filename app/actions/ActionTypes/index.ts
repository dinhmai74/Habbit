export * from './FetchTaskType'
export * from './AuthenticationType'
export * from './CreateEditTaskType'
export * from './DeleteTask'
export * from './FetchLifeLogType'
export * from './SocialLoginType'

export const getRequestString = (actionName: string) => `${actionName}_REQUEST`
export const getCommitString = (actionName: string) => `${actionName}_COMMIT`
export const getRollbackString = (actionName: string) =>
  `${actionName}_ROLLBACK`

export interface Action {
  type: string
  payload: any
}
