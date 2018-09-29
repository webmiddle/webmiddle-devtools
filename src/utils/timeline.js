import { parseResource } from "./resources";

export function makePath(parentPath, i) {
  return parentPath ? `${parentPath}.${i}` : String(i);
}

// classes only used to customize output of react-inspector
class Resource {}
class Virtual {}
class More {}

// NOTE: data shouldn't be the whole callStateInfo object
// since this function isn't able to parse it
export function parseData(data) {
  if (!data) return data;

  if (data.type === "function") {
    // eval-less solution to create a function with a dynamic name
    const fn = function() {};
    Object.defineProperty(fn, "name", { value: data.name });
    return fn;
  }

  if (data.type === "object") {
    return parseDataObj(data.value);
  }

  if (data.type === "array") {
    return parseDataArray(data.value);
  }

  if (data.type === "resource") {
    const resource = parseResource(data.value);
    return Object.assign(new Resource(), {
      ...resource,
      content: parseData(resource.content)
    });
  }

  if (data.type === "virtual") {
    return Object.assign(new Virtual(), {
      type: parseData(data.value.type),
      attributes: parseDataObj(data.value.attributes),
      children: parseData(data.value.children)
    });
  }

  if (data.type === "more") {
    const more = new More();
    // path: non enumerable to hide it in the Inspector
    Object.defineProperty(more, "path", {
      value: data.path,
      enumerable: false
    });
    Object.defineProperty(more, "serializedPath", {
      value: data.serializedPath,
      enumerable: false
    });
    return more;
  }

  return data.value;
}

export function parseDataObj(dataObj) {
  if (!dataObj) return;
  const result = {};
  Object.keys(dataObj).forEach(key => {
    result[key] = parseData(dataObj[key]);
  });
  return result;
}

function parseDataArray(dataArray) {
  if (!dataArray) return;
  return dataArray.map(parseData);
}
