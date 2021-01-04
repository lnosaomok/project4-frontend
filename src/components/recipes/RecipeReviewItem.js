import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const RecipeReviewItem = ({ review }) => {
  let transformedResult = {};
  const rating_values = ["0", "1", "2", "3", "4", "5"];

  let data = review.reduce((r, e) => {
    // get first letter of name of current element
    let group = e.value[0];
    // if there is no property in accumulator with this letter create it
    if (!r[group]) r[group] = { group, children: [e] };
    // if there is push current element to children array for that letter
    else r[group].children.push(e);
    // return accumulator
    return r;
  }, {});

  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(data);

  //const groupedReview = groupByKey(review, "value");
  //console.log(groupedReview);
  review.forEach((review) => {
    if (review.value.charAt(0) === "@") {
      let username = review.value.slice(1);
      transformedResult.username = username;
    } else if (review.value.charAt(0) === "%") {
      let date = review.value.slice(1);

      transformedResult.date = date;
    } else if (review.value.charAt(0) === "$") {
      let message = review.value.slice(1);
      transformedResult.message = message;
    } else if (rating_values.includes(review.value.charAt(0))) {
      let rating = parseInt(review.value);
      transformedResult.rating = rating;
    }
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className='review-outer'></div>
      <div className='rating-text'></div>
      <div>{review.message}</div>
    </>
  );
};

export default RecipeReviewItem;
