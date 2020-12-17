import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MessagesContext from "../../context/messages/MessagesContext";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function RecommendedRecipesItem({ recipe, timetoken }) {
  const messagesContext = useContext(MessagesContext);
  const {
    getReccomendedRecipes,
    reccommended_recipes,
    getRatings,
    recipeRatings,
    loading,
  } = messagesContext;
  const classes = useStyles();
  const ratingsArr = ["0", "1", "2", "3", "4", "5"];
  let recipeRatingsStars =
    recipeRatings && recipeRatings.length > 0
      ? recipeRatings.filter((item) => {
          return item.messageTimetoken === timetoken;
        })
      : [];
  recipeRatingsStars = recipeRatingsStars.filter((rating) => {
    if (ratingsArr.includes(rating.value)) {
      return rating;
    }
  });

  recipeRatingsStars = recipeRatingsStars
    .map((rating) => {
      return parseInt(rating.value);
    })
    .reduce((a, b) => a + b, 0);
  recipeRatingsStars = recipeRatingsStars / recipeRatings.length;
  console.log(recipeRatingsStars);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={recipe.recipe.image}
          title={recipe.recipe.label}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {recipe.recipe.label}
          </Typography>
          <StyledRating
            name='customized-color'
            value={recipeRatingsStars}
            defaultValue={0}
            readOnly
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.1}
            icon={<FavoriteIcon fontSize='inherit' />}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          <Link
            to={{
              pathname: "/view",
              data: { recipe, timetoken },
            }}
          >
            {" "}
            view
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
