import React, { useReducer, useContext } from "react";
import RecipesContext from "./RecipesContext";
import RecipesReducer from "./RecipesReducer";
import axios from "axios";
import {
  GENERAL_ERROR,
  GET_SAVED_RECIPES,
  SEARCH_RECIPE,
  DELETE_SAVED_RECIPE,
  CLEAR_ERRORS,
  SET_NUTRITION_OBJECT,
  SET_HEALTH_LABELS,
  SAVE_RECIPE,
} from "../types";

const RecipesState = (props) => {
  const initialState = {
    recipe_result: null,
    saved_recipes: null,
    error: null,
    loading: true,
    nutritionObject: null,
    healthLabels: null,
  };

  const [state, dispatch] = useReducer(RecipesReducer, initialState);
  const searchRecipes = (query, userPreferences) => {
    let url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`;

    if (userPreferences.fatMacro) {
      url += `&nutrients%5B${`FAT`}%5D=${userPreferences.fatMacro}`;
    }

    if (userPreferences.sugarMacro) {
      url += `&nutrients%5B${`SUGAR`}%5D=${userPreferences.sugarMacro}`;
    }

    if (userPreferences.carbsMacro) {
      url += `&nutrients%5B${`CHOCDF`}%5D=${userPreferences.carbsMacro}`;
    }

    if (userPreferences.proteinMacro) {
      url += `&nutrients%5B${`PROCNT`}%5D=${userPreferences.proteinMacro}`;
    }

    if (userPreferences.diet) {
      url += `&health=${userPreferences.diet}`;
    }
    try {
      axios.get(url).then(async function (response) {
        let resp = response.data.hits;
        resp = resp.filter((each) => {
          let recipeLabels = each.recipe.label.toLowerCase();
          query = query.toLowerCase();

          if (recipeLabels.includes(query)) {
            return each;
          }
        });

        let transformedResult = [];
        let finalData = [];

        await resp.forEach((result) => {
          transformedResult.push(result);
        });
        transformedResult.forEach((result) => {
          let resultObj = {};
          let nutrients = [];
          let allNutrients = [];
          let {
            FAT,
            CHOCDF,
            SUGAR,
            PROCNT,
            FIBTG,
          } = result.recipe.totalNutrients;
          for (const key in result.recipe.totalNutrients) {
            allNutrients.push(result.recipe.totalDaily[`${key}`]);
          }
          nutrients.push(FAT);
          nutrients.push(CHOCDF);
          nutrients.push(SUGAR);
          nutrients.push(PROCNT);
          nutrients.push(FIBTG);

          resultObj.nutrients = nutrients;
          resultObj.label = result.recipe.label;
          resultObj.image = result.recipe.image;
          resultObj.source = result.recipe.source;
          resultObj.url = result.recipe.url;
          resultObj.diet_labels = result.recipe.dietLabels;
          resultObj.recipe_yield = result.recipe.yield;
          resultObj.ingredientLines = result.recipe.ingredientLines;
          resultObj.ingredients = result.recipe.ingredients;
          resultObj.calories = result.recipe.calories;
          resultObj.allNutrients = allNutrients;
          finalData.push(resultObj);
          dispatch({
            type: SEARCH_RECIPE,
            payload: finalData,
          });
        });
      });
    } catch (err) {
      dispatch({
        type: GENERAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const getSavedRecipes = async () => {
    try {
      const res = await axios.get("/api/recipes");
      dispatch({ type: GET_SAVED_RECIPES, payload: res.data });
    } catch (err) {
      dispatch({ type: GENERAL_ERROR });
    }
  };

  const saveRecipe = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/recipes", formData, config);

      dispatch({
        type: SAVE_RECIPE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GENERAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const setNutritionObject = (obj) => {
    dispatch({
      type: SET_NUTRITION_OBJECT,
      payload: obj,
    });
  };
  const setHealthLabels = (obj) => {
    dispatch({
      type: SET_HEALTH_LABELS,
      payload: obj,
    });
  };
  return (
    <RecipesContext.Provider
      value={{
        recipe_result: state.recipe_result,
        saved_recipes: state.saved_recipes,
        loading: state.loading,
        healthLabels: state.healthLabels,
        clearErrors,
        error: state.error,
        saveRecipe,
        searchRecipes,
        getSavedRecipes,
        nutritionObject: state.nutritionObject,
        setNutritionObject,
        setHealthLabels,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
