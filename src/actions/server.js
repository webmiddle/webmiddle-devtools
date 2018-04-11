import { createActionTypes, asyncActionKeys, asyncActionValues } from '../utils/redux';
import * as server from '../services/server';

export const actionTypes = createActionTypes('server',
  asyncActionKeys('CONNECT'),
  asyncActionKeys('DISCONNECT'),

  asyncActionKeys('EVALUATE'),
  'EVALUATE_PROGRESS',
);

export const actionCreators = {
  connect: ({ hostname, port }) => ({
    types: asyncActionValues(actionTypes, 'CONNECT'),
    promise: () => server.connect(hostname, port),
    hostname,
    port,
  }),

  disconnect: () => ({
    types: asyncActionValues(actionTypes, 'DISCONNECT'),
    promise: () => server.disconnect(),
  }),

  evaluateService: ({ servicePath, bodyProps, bodyOptions }) => ({
    types: asyncActionValues(actionTypes, 'EVALUATE'),
    promise: ({ dispatch }) =>
      server.evaluateService(servicePath, bodyProps, bodyOptions, (message) => {
        dispatch({
          type: actionTypes.EVALUATE_PROGRESS,
          status: message.status,
          path: message.body && message.body.path,
          info: message.body && message.body.info,
        });
      }),
    servicePath,
    bodyProps,
    bodyOptions,
  }),
};
