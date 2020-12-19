import React, { useReducer, useContext } from "react";
import RecipesContext from "./RecipesContext";
import RecipesReducer from "./RecipesReducer";
import axios from "axios";
import {
  GENERAL_ERROR,
  GET_SAVED_RECIPES,
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

  const updateRating = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/recipes/update", formData, config);
    } catch (err) {
      dispatch({
        type: GENERAL_ERROR,
        payload: err.response.data.msg,
      });
    }
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
        getSavedRecipes,
        nutritionObject: state.nutritionObject,
        setNutritionObject,
        setHealthLabels,
        updateRating,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
