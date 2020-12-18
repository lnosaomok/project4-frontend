import React, { useContext, useRef, useEffect } from "react";
import MessagesContext from "../../context/messages/MessagesContext";

const FilterRecommended = () => {
  const searchRef = useRef("");
  const messagesContext = useContext(MessagesContext);
  const {
    filtered_recommended_recipes,
    filterRecommendedRecipes,
    clearFilteredRecommendedRecipes,
  } = messagesContext;

  useEffect(() => {
    if (filtered_recommended_recipes === null) {
      searchRef.current.value = "";
    }
  });

  const onChange = (e) => {
    if (searchRef.current.value !== "") {
      filterRecommendedRecipes(e.target.value);
    } else {
      clearFilteredRecommendedRecipes();
    }
  };
  return (
    <div class='row'>
      <form class='col s12'>
        <div class='row'>
          <div class='input-field col s12'>
            <i class='material-icons prefix'>search</i>
            <textarea
              id='icon_prefix2'
              ref={searchRef}
              class='materialize-textarea'
              placeholder='Filter Books...'
              onChange={onChange}
            ></textarea>

            <i
              class='material-icons prefix touch-click'
              onClick={() => {
                clearFilteredRecommendedRecipes();
              }}
            >
              close
            </i>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterRecommended;
