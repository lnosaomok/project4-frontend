import React, { useContext, useEffect } from "react";
import useInitializeListeners from "../../utils/useInitializeListeners";
import MessagesContext from "../../context/messages/MessagesContext";
import Spinner from "../../components/layout/Spinner";
import RecommendedRecipesItem from "./RecommendedRecipesItem";
import FilterRecommended from "./FilterRecommended";
const RecommendedRecipes = () => {
  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: {
      fetchMessages,
      publish,
      sendFile,
      addListener,
      addMessageAction,
      getMessageActions,
      getFile,
    },
    getReccomendedRecipes,
    reccommended_recipes,
    filtered_recommended_recipes,
    filterRecommendedRecipes,
    clearFilteredRecommendedRecipes,
    getRatings,
    recipeRatings,
    loading,
  } = messagesContext;
  useInitializeListeners();
  useEffect(() => {
    getReccomendedRecipes();
    getRatings();
  }, []);
  console.log(recipeRatings);
  let ratings = [...new Set(recipeRatings)];
  console.log(ratings);
  console.log(reccommended_recipes);
  return (
    <>
      <div class='container' id='container'>
        <FilterRecommended />{" "}
        <div id=''>
          <div id='recommended-recipes'>
            {" "}
            {reccommended_recipes !== null &&
            reccommended_recipes.length > 0 &&
            !loading ? (
              filtered_recommended_recipes !== null ? (
                filtered_recommended_recipes.map((recipe) => (
                  <div id='recommend-item'>
                    <RecommendedRecipesItem
                      recipe={recipe.message}
                      timetoken={recipe.timetoken}
                      ratings={ratings}
                    />
                  </div>
                ))
              ) : (
                reccommended_recipes.map((recipe) => (
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
              <Spinner />
            )}
          </div>
        </div>
      </div>
      {/* {
        <div class='container' id='container'>
          <FilterRecommended />{" "}
          <div id=''>
            {loading && <Spinner />}

            <div id='recommended-recipes'>
              {" "}
              {!loading &&
                reccommended_recipes !== null &&
                reccommended_recipes.length >0 &&
                reccommended_recipes.map((recipe) => {
                  return (
                    <div id='recommend-item'>
                      <RecommendedRecipesItem
                        recipe={recipe.message}
                        timetoken={recipe.timetoken}
                        ratings={ratings}
                      />
                    </div>
                  );
                })}
              ;
            </div>
          </div>
        </div>
      } */}
    </>
  );
};

export default RecommendedRecipes;
