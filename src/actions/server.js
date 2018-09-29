import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";

import {
  createActionTypes,
  asyncActionKeys,
  asyncActionValues
} from "../utils/redux";
import * as server from "../services/server";
import { actionCreators as resourcesActions } from "./resources";
import { actionCreators as timelineActions } from "./timeline";
import { parseResource } from "../utils/resources";
import { parseData } from "../utils/timeline";

export const actionTypes = createActionTypes(
  "server",
  asyncActionKeys("CONNECT"),
  asyncActionKeys("DISCONNECT"),

  asyncActionKeys("EVALUATE"),
  "EVALUATE_PROGRESS",

  asyncActionKeys("LOAD_MORE")
);

const handleEvaluateSuccess = result => dispatch => {
  // action.result is always a resource
  // (since it's wrapped into one if it isn't already)
  const resource = parseResource(result);
  dispatch(
    resourcesActions.addFile(
      "output.result",
      resource.id,
      resource.name,
      resource.contentType,
      resource.content
    )
  );

  return Promise.resolve(result);
};

const handleEvaluateProgress = (status, info) => dispatch => {
  if (status === "callStateInfo:add") {
    dispatch(timelineActions.addInfo(info));
    dispatch(resourcesActions.findAndAddResources(parseData(info.value)));
  }
  if (status === "callStateInfo:update") {
    dispatch(timelineActions.updateInfo(info));
    dispatch(resourcesActions.findAndAddResources(parseData(info.result)));
  }

  return Promise.resolve();
};

const handleLoadMoreSuccess = (result, path, serializedPath) => (
  dispatch,
  getState
) => {
  const { timeline } = getState();

  const value = typeof result === "string" ? JSON.parse(result) : result;
  console.log("LOAD MORE RESPONSE", value, path, serializedPath);
  const [callRootContextPath, infoPath, ...valuePath] = serializedPath;
  const info = get(timeline.callState, infoPath.split(".").join(".children."));
  const newInfo = cloneDeep(info);
  const valueParent = valuePath
    .slice(0, -1)
    .reduce((obj, part) => obj[part], newInfo);
  valueParent[valuePath[valuePath.length - 1]] = value;
  dispatch(timelineActions.updateInfo(newInfo));

  dispatch(
    resourcesActions.findAndAddResources(parseData(newInfo[valuePath[0]]))
  );

  return Promise.resolve(result);
};

export const actionCreators = {
  connect: ({ hostname, port }) => ({
    types: asyncActionValues(actionTypes, "CONNECT"),
    promise: () =>
      server.connect(
        hostname,
        port
      ),
    hostname,
    port
  }),

  disconnect: () => ({
    types: asyncActionValues(actionTypes, "DISCONNECT"),
    promise: () => server.disconnect()
  }),

  evaluateService: ({ servicePath, bodyProps, bodyOptions }) => ({
    types: asyncActionValues(actionTypes, "EVALUATE"),
    promise: ({ dispatch }) =>
      server
        .evaluateService(servicePath, bodyProps, bodyOptions, message => {
          dispatch(
            handleEvaluateProgress(
              message.status,
              message.body && message.body.info
            )
          );
          dispatch({
            type: actionTypes.EVALUATE_PROGRESS,
            status: message.status,
            info: message.body && message.body.info
          });
        })
        .then(result => dispatch(handleEvaluateSuccess(result))),
    servicePath,
    bodyProps,
    bodyOptions
  }),

  loadMore: ({ path, serializedPath }) => ({
    types: asyncActionValues(actionTypes, "LOAD_MORE"),
    promise: ({ dispatch }) => {
      console.log("LOAD MORE REQUEST", path, serializedPath);
      return server
        .loadMore(path, serializedPath)
        .then(result =>
          dispatch(handleLoadMoreSuccess(result, path, serializedPath))
        );
    },
    path,
    serializedPath
  })
};
