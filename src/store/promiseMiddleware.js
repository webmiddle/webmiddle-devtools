// based on https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
export default function promiseMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise({ dispatch, getState });
      actionPromise
        .then(
          result => next({ ...rest, result, type: SUCCESS }),
          error => next({ ...rest, error, type: FAILURE })
        )
        .catch(error => {
          console.error("MIDDLEWARE ERROR:", error);
          if (error && error.stack) console.log(error.stack);
          next({ ...rest, error, type: FAILURE });
        });

      return actionPromise;
    };
  };
}
