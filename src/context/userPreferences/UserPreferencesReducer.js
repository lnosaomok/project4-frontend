import {
  GENERAL_ERROR,
  SET_USER_PREFERENCES,
  GET_USER_PREFERENCES,
  CLEAR_ERRORS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: action.payload,
      };

    case GET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: action.payload,
      };

    case GENERAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};
