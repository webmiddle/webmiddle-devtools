import { parseResource } from './resources';

export function makePath(parentPath, i) {
  return parentPath ? `${parentPath}.${i}` : String(i);
}

// classes only used to customize output of react-inspector
class Resource {};
class Virtual {};
class More {};

export function transformData(data) {
  if (!data) return data;

  if (data.type === 'function') {
    // eval-less solution
    // uses the javascript engine ability
    // to infer anonymous function names
    // TODO: not working anymore
    const obj = {
      [data.name]: () => {},
    };
    return obj[data.name];
  }

  if (data.type === 'object') {
    return transformDataObj(data.value);
  }

  if (data.type === 'array') {
    return transformDataArray(data.value);
  }

  if (data.type === 'resource') {
    const resource = parseResource(data.value);
    return Object.assign(new Resource(), {
      ...resource,
      content: transformData(resource.content),
    });
  }

  if (data.type === 'virtual') {
    return Object.assign(new Virtual(), {
      type: transformData(data.value.type),
      attributes: transformDataObj(data.value.attributes),
      children: transformData(data.value.children),
    });
  }

  if (data.type === 'more') {
    return new More();
  }

  return data.value;
}

export function transformDataObj(dataObj) {
  if (!dataObj) return;
  const result = {};
  Object.keys(dataObj).forEach((key) => {
    result[key] = transformData(dataObj[key]);
  });
  return result;
}

function transformDataArray(dataArray) {
  if (!dataArray) return;
  return dataArray.map(transformData);
}