import React, { useContext, useEffect } from "react";
import useInitializeListeners from "../../utils/useInitializeListeners";
import MessagesContext from "../../context/messages/MessagesContext";
import Spinner from "../layout/Spinner";
import RecommendedRecipesItem from "./RecommendedRecipesItem";
import FilterRecommended from "./FilterRecommended";

const RecommendedRecipes = () => {
  /////// initialize pub/sub listeners
  useInitializeListeners();

  const messagesContext = useContext(MessagesContext);
  const {
    getReccomendedRecipes,
    reccommended_recipes,
    filtered_recommended_recipes,
    getRatings,
    recipeRatings,
    loading,
  } = messagesContext;

  useEffect(() => {
    getReccomendedRecipes();
    getRatings();
  }, []);
  //// make sure no duplicates
  let ratings = [...new Set(recipeRatings)];

  return (
    <>
      <div class='container' id='container'>
        <FilterRecommended />{" "}
        <div id=''>
          <h5>Recipes other users have shared: </h5>
          <div id='recommended-recipes'>
            {" "}
            {reccommended_recipes !== null &&
            reccommended_recipes.length > 0 &&
            !loading ? (
              filtered_recommended_recipes !== null ? (
                filtered_recommended_recipes
                  .filter((recipe) => {
                    return recipe.message.recipe;
                  })
                  .map((recipe) => (
                    <div id='recommend-item'>
                      <RecommendedRecipesItem
                        recipe={recipe.message}
                        timetoken={recipe.timetoken}
                        ratings={ratings}
                      />
                    </div>
                  ))
              ) : (
                reccommended_recipes
                  .filter((recipe) => {
                    return recipe.message.recipe;
                  })
                  .map((recipe) => (
                    <div id='recommend-item'>
                      <RecommendedRecipesItem
                        recipe={recipe.message}
                        timetoken={recipe.timetoken}
                        ratings={ratings}
                      />
                    </div>
                  ))
              )
            ) : (
              <p>No recipies to recommend</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedRecipes;
