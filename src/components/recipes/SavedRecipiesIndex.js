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
import RatingModal from "../recipes/Modals/RatingModal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NutritionModal from "../recipes/Modals/NutritionModal";
import UploadModal from "../recipes/Modals/UploadModal";
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
  const classes = useStyles();
  const [openNutritionModal, setOpenNutritionModal] = React.useState(false);
  const [openRatingsModal, setOpenRatingsModal] = React.useState(false);
  const [openUploadModal, setOpenUploadModal] = React.useState(false);

  //// handle modals
  const handleClickUploadModalOpen = () => {
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
  };

  const handleClickNutritionModalOpen = () => {
    setOpenNutritionModal(true);
  };

  const handleCloseNutritionModal = () => {
    setOpenNutritionModal(false);
  };

  const handleClickRatingsModalOpen = () => {
    setOpenRatingsModal(true);
  };

  const handleCloseRatingsModal = () => {
    setOpenRatingsModal(false);
  };

  const recipesContext = useContext(RecipesContext);
  const { saved_recipes, loading, getSavedRecipes } = recipesContext;

  useEffect(async () => {
    await getSavedRecipes();
  }, []);

  const searchedRecipes = saved_recipes
    ? saved_recipes.filter((recipe) => {
        return recipe.type === "personal";
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
          open={openRatingsModal}
          handleClose={handleCloseRatingsModal}
          timetoken={saved_recipes[props.match.params.index].timetoken}
          id={saved_recipes[props.match.params.index]._id}
        />
        <NutritionModal
          allNutrients={
            saved_recipes[props.match.params.index].recipe.allNutrients
          }
          open={openNutritionModal}
          handleClose={handleCloseNutritionModal}
          healthLabels={
            saved_recipes[props.match.params.index].recipe.diet_labels
          }
        />
        <UploadModal
          open={openUploadModal}
          handleClose={handleCloseUploadModal}
          timetoken={saved_recipes[props.match.params.index].timetoken}
        />
        <div className={classes.root}>
          <CssBaseline />
          <ul id='slide-out' class='sidenav-fixed z-depth-5'>
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
                    {saved_recipes[props.match.params.index].recipe.type ===
                    "personal" ? (
                      <CollectionButton
                        recipe={
                          saved_recipes[props.match.params.index].recipe.recipe
                        }
                      />
                    ) : !saved_recipes[props.match.params.index].recipe
                        .isRated ? (
                      <div className='buttons-mix'>
                        <Button
                          variant='outlined'
                          color='primary'
                          id='focus-Transparent'
                          onClick={handleClickRatingsModalOpen}
                        >
                          Rate Recipe
                        </Button>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={handleClickUploadModalOpen}
                        >
                          Upload Recipe Creation
                        </Button>
                      </div>
                    ) : (
                      ""
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
                  onClick={handleClickNutritionModalOpen}
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
                  {Array.isArray(
                    saved_recipes[props.match.params.index].recipe.source
                  ) ? (
                    <ul className='collection'>
                      <li class='collection-header'>
                        <h5>Instructions</h5>
                      </li>{" "}
                      {saved_recipes[
                        props.match.params.index
                      ].recipe.source.map((item, index) => {
                        return (
                          <li class='collection-item'>{`${
                            index + 1
                          } -${item}`}</li>
                        );
                      })}
                    </ul>
                  ) : (
                    <a href='#'>Cooking Instructions </a>
                  )}
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
