import pretty from "pretty";

// brace modes
export const modeByContentType = {
  "text/plain": "text",
  "text/html": "html",
  "text/xml": "xml",
  "application/json": "json",
  "x-webmiddle-type": "json",
  "x-webmiddle-virtual": "json"
};

export function parseResource(data) {
  return typeof data === "string" ? JSON.parse(data) : data;
}

export function prettify(file) {
  const mode = modeByContentType[file.contentType];
  try {
    if (mode === "html" || mode === "xml") {
      return pretty(file.content, { ocd: true });
    }
    if (mode === "json") {
      return JSON.stringify(JSON.parse(file.content), null, 2);
    }
  } catch (err) {
    console.error(err);
    // just use the content as is in case of errors
  }

  return file.content;
}
