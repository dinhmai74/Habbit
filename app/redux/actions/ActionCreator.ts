const offlineActionCreator = (
  url: string,
  type: string,
  id: string,
  payloadVal: object,
  effect: object,
  commitMeta?: object,
  rollbackMeta?: object,
  urgent: boolean = false,
  ...restOfArg: any[]
) => ({
  type: `${type}_REQUEST`,
  payload: payloadVal,
  meta: {
    offline: {
      effect: {
        ...effect,
        url,
      },
      commit: {
        type: `${type}_COMMIT`,
        meta: { id, ...commitMeta },
      },
      rollback: {
        type: `${type}_ROLLBACK`,
        meta: { id, ...rollbackMeta },
      },
    },
    urgent,
  },
  ...restOfArg,
});

export { offlineActionCreator };
