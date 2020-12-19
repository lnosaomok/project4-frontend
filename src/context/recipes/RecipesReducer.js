import {
  GENERAL_ERROR,
  GET_SAVED_RECIPES,
  SET_NUTRITION_OBJECT,
  SAVE_RECIPE,
  SET_HEALTH_LABELS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
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
