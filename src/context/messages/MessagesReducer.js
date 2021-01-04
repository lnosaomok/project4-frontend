import {
  ADD_RECCOMENDED_RECIPE,
  ADD_RECIPE_RATING,
  GET_RECCOMENDED_RECIPES,
  GET_RECIPE_RATINGS,
  NEW_IMAGE_FILE,
  GET_IMAGE_FILES,
  FILTER_RECOMMENDED_RECIPES,
  CLEAR_FILTERED_RECOMMENDED_RECIPES,
  GET_ALL_POSTS,
  ADD_POST_REPLIES,
  GET_POST_REPLIES,
  ADD_POST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_RECCOMENDED_RECIPE:
      return {
        ...state,
        reccommended_recipes: [...state.reccommended_recipes, action.item],
      };

    case ADD_POST:
      return {
        ...state,
        allPosts: [...state.allPosts, action.item],
      };

    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.item,
        loading: false,
      };
    case ADD_RECIPE_RATING:
      return {
        ...state,
        recipeRatings: [...state.recipeRatings, action.item],
      };

    case ADD_POST_REPLIES:
      return {
        ...state,
        postReplies: [...state.postReplies, action.item],
      };

    case GET_POST_REPLIES:
      return {
        ...state,
        postReplies: action.item,
        loading: false,
      };
    case GET_IMAGE_FILES:
      return {
        ...state,
        imageFilesList: action.item,
      };

    case FILTER_RECOMMENDED_RECIPES:
      return {
        ...state,
        filtered_recommended_recipes: state.reccommended_recipes
          .filter((recipe) => {
            return recipe.message.recipe;
          })
          .filter((recipe) => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return recipe.message.recipe.label.match(regex);
          }),
      };
    case CLEAR_FILTERED_RECOMMENDED_RECIPES:
      return {
        ...state,
        filtered_recommended_recipes: null,
      };

    case NEW_IMAGE_FILE:
      return {
        ...state,
        imageFilesList: [...state.imageFilesList, action.item],
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
