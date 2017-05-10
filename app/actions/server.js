import { createActionTypes, asyncActionKeys, asyncActionValues } from '../utils/redux';
import * as server from '../services/server';

export const actionTypes = createActionTypes('server',
  asyncActionKeys('CONNECT'),
  asyncActionKeys('DISCONNECT'),
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
  })
};
