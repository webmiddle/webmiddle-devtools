let ws;

export function connect(hostname, port) {
  return new Promise((resolve, reject) => {
    try {
      const socket = new WebSocket(`ws://${hostname}:${port}/`);
      socket.onopen = () => {
        ws = socket;
        resolve(socket);
      };
      socket.onerror = reject;
    } catch (err) {
      reject(err);
    }
  });
}

export function disconnect() {
  return new Promise((resolve) => {
    ws.close();
    ws = undefined;
    resolve();
  });
}
