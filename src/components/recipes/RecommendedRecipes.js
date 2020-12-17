import React, { useContext, useEffect } from "react";
import useInitializeListeners from "../../utils/useInitializeListeners";
import MessagesContext from "../../context/messages/MessagesContext";
import Spinner from "../../components/layout/Spinner";
import RecommendedRecipesItem from "./RecommendedRecipesItem";

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
  return (
    <>
      {
        <div class='container' id='container'>
          {" "}
          <div id=''>
            {loading && <Spinner />}

            <div id='recommended-recipes'>
              {" "}
              {!loading &&
                reccommended_recipes !== null &&
                reccommended_recipes.length &&
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
      }
    </>
  );
};

export default RecommendedRecipes;
