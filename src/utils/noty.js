import Noty from "noty";

function getErrorMessage(err) {
  if (typeof err === "object" && err !== null) {
    if (err.message) return err.message;
    return JSON.stringify(err);
  }

  return String(err);
}

function show(options = {}) {
  const noty = new Noty({
    theme: "mint",
    layout: "topCenter",
    timeout: 3000,
    ...options
  });
  noty.show();
  return noty;
}

export function showError(err, options) {
  const text = getErrorMessage(err);

  return show({
    type: "error",
    text,
    ...options
  });
}

export function showWarning(options) {
  if (typeof options === "string") {
    options = { text: options };
  } else if (options instanceof Error) {
    options = { text: getErrorMessage(options) };
  }

  return show({
    type: "warning",
    ...options
  });
}
