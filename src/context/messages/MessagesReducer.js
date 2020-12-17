import {
  ADD_RECCOMENDED_RECIPE,
  ADD_RECIPE_RATING,
  GET_RECCOMENDED_RECIPES,
  GET_RECIPE_RATINGS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_RECCOMENDED_RECIPE:
      return {
        ...state,
        reccommended_recipes: [...state.reccommended_recipes, action.item],
      };

    case ADD_RECIPE_RATING:
      return {
        ...state,
        recipeRatings: [...state.recipeRatings, action.item],
      };

    case GET_RECCOMENDED_RECIPES:
      return {
        ...state,
        reccommended_recipes: action.item,
        loading: false,
      };

    case GET_RECIPE_RATINGS:
      return {
        ...state,
        recipeRatings: action.item,
        loading: false,
      };

    default:
      return state;
  }
};
