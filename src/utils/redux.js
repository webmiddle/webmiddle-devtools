// @flow
import flattenDeep from "lodash/flattenDeep";
import pick from "lodash/pick";
import values from "lodash/values";

export function createActionTypes(prefix: string, ...actionKeys) {
  const flattenedActionKeys: Array<string> = flattenDeep(actionKeys);
  return flattenedActionKeys.reduce((obj, currentActionKey) => {
    obj[currentActionKey] = `${prefix}/${currentActionKey}`;
    return obj;
  }, {});
}

export function asyncActionKeys(prefix: string) {
  return [prefix, `${prefix}_SUCCESS`, `${prefix}_FAIL`];
}

export function asyncActionValues(actionTypes, prefix) {
  return values(pick(actionTypes, asyncActionKeys(prefix)));
}
