import {
  GENERAL_ERROR,
  GET_SAVED_RECIPES,
  SEARCH_RECIPE,
  DELETE_SAVED_RECIPE,
  CLEAR_ERRORS,
  SET_NUTRITION_OBJECT,
  SAVE_RECIPE,
  SET_HEALTH_LABELS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_RECIPE:
      return {
        ...state,
        recipe_result: action.payload,
        loading: false,
      };
    case SET_NUTRITION_OBJECT:
      return {
        ...state,
        nutritionObject: action.payload,
      };

    case SET_HEALTH_LABELS:
      return {
        ...state,
        healthLabels: action.payload,
      };

    case GET_SAVED_RECIPES:
      return {
        ...state,
        saved_recipes: action.payload,
        loading: false,
      };
    case SAVE_RECIPE:
      return {
        ...state,
        loading: false,
      };
    case GENERAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
  }
};
