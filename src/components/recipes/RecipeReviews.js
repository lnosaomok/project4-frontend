import React from "react";
import RecipeReviewItem from "./RecipeReviewItem";
const RecipeReviews = ({ allReviews }) => {
  return (
    <>
      <div className='reviews-container'>
        {allReviews &&
          allReviews.map((review) => {
            return (
              <div>
                <RecipeReviewItem review={review} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RecipeReviews;
