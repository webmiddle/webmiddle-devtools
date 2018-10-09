import { actionTypes as authActionTypes } from "../actions/auth";

const initialState = {
  fetched: false,
  fetching: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.FETCH:
      return {
        ...state,
        fetching: true
      };
    case authActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetched: true,
        fetching: false
      };
    case authActionTypes.FETCH_FAIL:
      return {
        ...state,
        fetched: true,
        fetching: false
      };
    default:
      return state;
  }
}
