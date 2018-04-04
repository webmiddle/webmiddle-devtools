export function makePath(parentPath, i) {
  return parentPath ? `${parentPath}.${i}` : String(i);
}

export function transformData(data) {
  if (!data) return;

  if (data.type === 'function') {
    // eval-less solution
    // uses the javascript engine ability
    // to infer anonymous function names
    const obj = {
      [data.name]: () => {},
    };
    return obj[data.name];
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
