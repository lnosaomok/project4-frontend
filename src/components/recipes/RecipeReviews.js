import React from "react";
import RecipeReviewItem from "./RecipeReviewItem";
const RecipeReviews = ({ allReviews }) => {
  //const reviews = [...allReviews];
  console.log(allReviews);
  let reviewsArr = [];
  if (allReviews) {
    for (const key in allReviews) {
      reviewsArr.push(allReviews[`${key}`]);
    }
  }
  console.log(reviewsArr);

  return (
    <>
      <div className='reviews-container'>
        {reviewsArr &&
          reviewsArr.map((review) => {
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
