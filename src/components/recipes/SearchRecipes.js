import React from "react";
import M from "materialize-css/dist/js/materialize.min";
import { useState, useEffect, useContext } from "react";
import { data } from "./AutoSuggestOptions";
import RecipesContext from "../../context/recipes/RecipesContext";
import UserPreferencesContext from "../../context/userPreferences/UserPreferencesContext";
import Spinner from "../../components/layout/Spinner";
import RecipeResults from "./RecipeResults";
import NutritionTableForModal from "./NutritionTableForModal";
import Chip from "@material-ui/core/Chip";

const SearchRecipes = () => {
  const userPreferencesContext = useContext(UserPreferencesContext);
  const { userPreferences } = userPreferencesContext;
  const recipesContext = useContext(RecipesContext);
  const {
    recipe_result,
    saved_recipes,
    loading,
    saveRecipe,
    clearErrors,
    searchRecipes,
    nutritionObject,
    setNutritionObject,
    healthLabels,
  } = recipesContext;

  const [query, setQuery] = useState("");

  useEffect(() => {
    searchRecipes(query, userPreferences);
  }, []);
  const options = { data: data };
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".autocomplete");
      var instances = M.Autocomplete.init(elems, options);
    });
  }, []);

  console.log(saved_recipes);
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
    });
  }, []);

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
    document.querySelector("#recipes").style.zIndex = "0";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchRecipes(query, userPreferences);
    setQuery("");
  };

  return (
    <div class='container' id='container'>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className='input-field search-box'>
          <input
            value={query}
            className='autocomplete'
            onChange={(e) => {
              onChangeQuery(e);
            }}
            id='autocomplete-input'
            type='text'
            required
          />

          <button
            type='submit'
            className='btn small waves-effect waves-light'
            id='search-btn'
          >
            Search
          </button>
        </div>
      </form>

      <div className='' id=''>
        {loading && <Spinner />}
      </div>
      <div id='recipes'>
        {" "}
        {!loading && recipe_result !== null && (
          <RecipeResults recipelist={recipe_result} />
        )}
      </div>
      <div id='modal1' class='modal'>
        <div class='modal-content'>
          <div className='nutrition-header'>
            <div>
              {" "}
              <h4 className='special-font'>Nutrition Information</h4>
            </div>

            <div>
              {" "}
              <a
                href='#!'
                class='modal-close waves-effect waves-green btn-flat'
              >
                Close
              </a>
            </div>
          </div>

          <div id='nutrition'>
            <div className='nutrition-chips'>
              {" "}
              {healthLabels &&
                healthLabels.map((label) => {
                  return <Chip label={label} color='primary' />;
                })}
            </div>

            <div id='table'>
              {" "}
              <NutritionTableForModal
                allNutrients={nutritionObject}
                healthLabels={healthLabels}
              />
            </div>
          </div>
        </div>
        <div class='modal-footer'></div>
      </div>
    </div>
  );
};

export default SearchRecipes;
