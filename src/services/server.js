import uuid from "uuid";

let ws;

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

      ws.send(JSON.stringify({ type: "request", requestId, path, body }));
    } catch (err) {
      console.error(err instanceof Error ? err.stack : err);
      reject(err instanceof Error ? err.stack : err);
    }
  });
}

export function connect(hostname, port) {
  return new Promise((resolve, reject) => {
    try {
      ws = new WebSocket(`ws://${hostname}:${port}/`);
      ws.addEventListener("open", () => {
        resolve(ws);
      });
      ws.addEventListener("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}

export function disconnect() {
  return new Promise(resolve => {
    ws.close();
    ws = undefined;
    resolve();
  });
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
