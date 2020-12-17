import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import M from "materialize-css/dist/js/materialize.min";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CollectionButton from "./CollectionButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import RecipesContext from "../../context/recipes/RecipesContext";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import UserPreferencesContext from "../../context/userPreferences/UserPreferencesContext";
import NutritionModal from "./NutritionModal";
import { useState } from "react";
import { useEffect } from "react";
import bb, { gauge } from "billboard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[1500],
  },
}));

export default function RecipeResultsItem({ recipe, key }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [recipeSaved, setRecipeSaved] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setHealthLabels,
    setNutritionObject,
  } = recipesContext;
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { user, isAuthenticated } = authContext;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const saveRecipeItem = async () => {
    let type = "search";
    if (!isAuthenticated) {
      M.toast({ html: "You must be logged in to save" });
    } else {
      setRecipeSaved(true);
      M.toast({ html: "Saved" });
      await saveRecipe({ recipe, type });
    }
  };

  return (
    <>
      <NutritionModal
        allNutrients={recipe.allNutrients}
        open={open}
        handleClose={handleClose}
        healthLabels={recipe.diet_labels}
      />
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              <i class='material-icons'>restaurant</i>
            </Avatar>
          }
          action={
            <Button
              variant='outlined'
              color='primary'
              id='focus-Transparent'
              onClick={handleClickOpen}
            >
              View Nutrition
            </Button>
          }
          title={recipe.label}
        />
        <CardMedia
          className={classes.media}
          image={recipe.image}
          title='Paella dish'
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`Calories: ${recipe.calories.toFixed()} kcal per serving`}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`Number of Servings: ${recipe.recipe_yield}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            id='focus-transparent'
            onClick={() => {
              saveRecipeItem();
            }}
          >
            <i class='small material-icons'>
              {recipeSaved ? "check_circle" : "add_circle"}
            </i>
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            id='focus-transparent'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              <h6>Ingredients:</h6>
            </Typography>
            <List aria-label='ingrediet list'>
              {recipe.ingredientLines.map((ingredient) => {
                return (
                  <>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
