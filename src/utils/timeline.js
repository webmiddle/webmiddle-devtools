export function makePath(parentPath, i) {
  return parentPath ? `${parentPath}.${i}` : String(i);
}

export function transformData(data) {
  if (!data) return data;

  if (data.type === 'function') {
    // eval-less solution
    // uses the javascript engine ability
    // to infer anonymous function names
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
    return {
      ...data.value,
      content: transformData(data.value.content),
    }
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

export function transformDataArray(dataArray) {
  if (!dataArray) return;
  return dataArray.map(transformData);
}