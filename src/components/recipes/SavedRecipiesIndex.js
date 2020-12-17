import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RecipesContext from "../../context/recipes/RecipesContext";
import Spinner from "../layout/Spinner";
import NutritionTable from "./NutritionTable";
import Chip from "@material-ui/core/Chip";
import CollectionButton from "./CollectionButton";
import RatingModal from "./RatingModal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NutritionModal from "./NutritionModal";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: `${63}px`,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function SavedRecipesIndex(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const recipesContext = useContext(RecipesContext);
  const {
    recipe_result,
    saved_recipes,
    loading,
    saveRecipe,
    clearErrors,
    searchRecipes,
    getSavedRecipes,
    setHealthLabels,
    nutritionObject,
    setNutritionObject,
    healthLabels,
  } = recipesContext;

  useEffect(async () => {
    await getSavedRecipes();
  }, []);

  useEffect(() => {
    if (document.querySelector(".MuiListItemText-primary")) {
      document
        .querySelectorAll(".MuiListItemText-primary")
        .forEach((element, index) => {
          element.id = index;
        });
    }
  }, []);
  const classes = useStyles();

  const searchedRecipes = saved_recipes
    ? saved_recipes.filter((recipe) => {
        return recipe.type === "search";
      })
    : null;

  const recommendedRecipes = saved_recipes
    ? saved_recipes.filter((recipe) => {
        return recipe.type === "recommended";
      })
    : null;

  return saved_recipes !== null && !loading ? (
    saved_recipes.length > 0 ? (
      <>
        <RatingModal
          open={open}
          handleClose={handleClose}
          timetoken={saved_recipes[props.match.params.index].timetoken}
        />
        <NutritionModal
          allNutrients={
            saved_recipes[props.match.params.index].recipe.allNutrients
          }
          open={open}
          handleClose={handleClose}
          healthLabels={
            saved_recipes[props.match.params.index].recipe.diet_labels
          }
        />
        <div className={classes.root}>
          <CssBaseline />
          <ul id='slide-out' class='sidenav-fixed z-depth-5'>
            <li>Searched Recipes</li>
            {searchedRecipes.map((recipe, index) => {
              return (
                <>
                  {" "}
                  <Divider id={index} />
                  <ListItem button key={recipe.recipe.label} id={index}>
                    <Link
                      to={{
                        pathname: "/showrecipe",
                        data: recipe,
                      }}
                    >
                      {" "}
                      <ListItemText primary={recipe.recipe.label} id={index} />
                    </Link>
                  </ListItem>
                </>
              );
            })}

            <li className='collection-header'>Recommended Recipes</li>
            {recommendedRecipes.map((recipe, index) => {
              return (
                <>
                  {" "}
                  <Divider id={index} />
                  <ListItem button key={recipe.recipe.label} id={index}>
                    <Link
                      to={{
                        pathname: "/showrecipe",
                        data: recipe,
                      }}
                    >
                      {" "}
                      <ListItemText primary={recipe.recipe.label} id={index} />
                    </Link>
                  </ListItem>
                </>
              );
            })}
          </ul>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div class='favourites'>
              <div class='col s12 m12'>
                <div class='title-label'>
                  <div className='title-bar'>
                    <h4>
                      {saved_recipes[props.match.params.index].recipe.label}
                    </h4>
                    {saved_recipes[props.match.params.index].type ===
                    "search" ? (
                      <CollectionButton
                        recipe={saved_recipes[props.match.params.index].recipe}
                      />
                    ) : (
                      <Button
                        variant='outlined'
                        color='primary'
                        id='focus-Transparent'
                        onClick={handleClickOpen}
                      >
                        Rate Recipe
                      </Button>
                    )}
                  </div>
                  <div className='nutrition-chips'>
                    {" "}
                    {saved_recipes[
                      props.match.params.index
                    ].recipe.diet_labels.map((label) => {
                      return <Chip label={label} color='primary' />;
                    })}
                  </div>
                  <img
                    class=' s12 m12 inner-img'
                    id='activator'
                    src={saved_recipes[props.match.params.index].recipe.image}
                  />
                </div>
                <Button
                  variant='outlined'
                  color='primary'
                  id='focus-Transparent'
                  onClick={handleClickOpen}
                >
                  View Nutrition
                </Button>
                <div class=''>
                  <ul class='collection with-header'>
                    <li class='collection-header'>
                      <h5>Ingredients</h5>
                    </li>

                    {saved_recipes[
                      props.match.params.index
                    ].recipe.ingredientLines.map((one, index) => {
                      return <li class='collection-item'>{one}</li>;
                    })}
                  </ul>

                  <a
                    href='#'
                    onClick="window.open('<%=element.favourite.url%>', '_blank');"
                  >
                    Cooking Instructions from
                    {saved_recipes[props.match.params.index].recipe.url}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    ) : (
      <div class='container container-inner'>
        <div class='card'>
          <h4>
            No recipes saved yet, search for recipes on the{" "}
            <a href='/recipies'>search recipes page</a>{" "}
          </h4>
        </div>
      </div>
    )
  ) : (
    <Spinner />
  );
}
