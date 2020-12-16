import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeResultsItem from "./RecipeResultsItem";
import "./RecipeResults.css";
import M from "materialize-css/dist/js/materialize.min";

const RecipeResults = ({ recipelist }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass='carousel-container'
      renderButtonGroupOutside={true}
      dotListClass='custom-dot-list-style'
      itemClass='carousel-item-padding-40-px'
      partialVisible={true}
    >
      {recipelist.map((recipe, index) => (
        <RecipeResultsItem key={index} recipe={recipe} />
      ))}
    </Carousel>
  );
};

export default RecipeResults;
