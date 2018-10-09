import uuid from "uuid";
import EventEmitter from "event-emitter";

let ws;
let apiKey;

export const emitter = new EventEmitter();

// Note: assumes connection is already established
function requestWebsocket(path, body = {}, onProgress) {
  return new Promise((resolve, reject) => {
    try {
      const requestId = uuid.v4();

      ws.addEventListener("message", event => {
        const rawMessage = event.data;
        //console.log("received from server: %s", rawMessage);
        const message = JSON.parse(rawMessage);
        if (message.requestId !== requestId) return;

        if (message.type === "progress") {
          if (onProgress) onProgress(message);
        }

        if (message.type === "response") {
          if (message.status === "success") {
            resolve(message.body);
          } else if (message.status === "error") {
            reject(message.body);
          }
        }
      });

      ws.send(
        JSON.stringify({
          type: "request",
          requestId,
          authorization: apiKey,
          path,
          body
        })
      );
    } catch (err) {
      console.error(err instanceof Error ? err.stack : err);
      reject(err instanceof Error ? err.stack : err);
    }
  });
}

export function connect(hostname, port, key) {
  return new Promise((resolve, reject) => {
    try {
      apiKey = key;
      ws = new WebSocket(`ws://${hostname}:${port}/`);
      ws.addEventListener("open", () => {
        resolve(ws);
      });
      ws.addEventListener("error", event => {
        // the event object doesn't include any
        // description on what happened
        reject(new Error("websocket error"));
      });
      ws.addEventListener("close", event => {
        emitter.emit("close");
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function disconnect() {
  return new Promise(resolve => {
    if (ws) ws.close();
    ws = undefined;
    apiKey = undefined;
    resolve();
  });
}

export function fetchServicePaths() {
  return requestWebsocket("/services/");
}

export function evaluateService(
  servicePath,
  bodyProps,
  bodyOptions,
  onProgress = () => {}
) {
  const httpPath = "/services/" + servicePath.replace(/\./g, "/");
  const body = {
    props: bodyProps,
    options: {
      ...bodyOptions,
      debug: true
    }
  };
  return requestWebsocket(httpPath, body, onProgress);
}

export function loadMore(path, serializedPath) {
  const httpPath = "/more/";
  const body = {
    props: {
      path,
      serializedPath
    }
  };
  return requestWebsocket(httpPath, body);
}
