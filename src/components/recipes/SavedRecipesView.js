import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RecipesContext from "../../context/recipes/RecipesContext";
import Spinner from "../layout/Spinner";
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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const SavedRecipesView = (props) => {
  const { data } = props.location;

  ////////knowne issue : the page loses the props on refresh. Issue is yet to be resolved ///////
  const [openNutritionModal, setOpenNutritionModal] = React.useState(false);
  const [openRatingsModal, setOpenRatingsModal] = React.useState(false);
  const [openUploadModal, setOpenUploadModal] = React.useState(false);

  ///// control modals open/close property
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
        return recipe.type === "personal";
      })
    : null;

  const recommendedRecipes = saved_recipes
    ? saved_recipes.filter((recipe) => {
        return recipe.type === "recommended";
      })
    : null;

  const openUrl = (url) => {
    window.open(`${url}`, `blank`);
  };
  return saved_recipes !== null && data !== undefined && !loading ? (
    saved_recipes.length > 0 ? (
      <>
        <RatingModal
          open={openRatingsModal}
          handleClose={handleCloseRatingsModal}
          timetoken={data.timetoken}
          id={data._id}
        />

        <NutritionModal
          allNutrients={data.recipe.allNutrients}
          open={openNutritionModal}
          handleClose={handleCloseNutritionModal}
          healthLabels={data.recipe.diet_labels}
        />
        <UploadModal
          open={openUploadModal}
          handleClose={handleCloseUploadModal}
          timetoken={data.timetoken}
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
                    <h4>{data.recipe.label}</h4>
                    <div>
                      {data.type === "personal" ? (
                        <CollectionButton recipe={data.recipe} />
                      ) : !data.isRated ? (
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
                            Upload Your Recipe Creation
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className='nutrition-chips'>
                    {" "}
                    {data.recipe.diet_labels.map((label) => {
                      return <Chip label={label} color='primary' />;
                    })}
                  </div>
                  <img
                    class=' s12 m12 inner-img'
                    id='activator'
                    src={data.recipe.image}
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

                    {data.recipe.ingredientLines.map((one, index) => {
                      return <li class='collection-item'>{one}</li>;
                    })}
                  </ul>

                  {Array.isArray(data.recipe.source) ? (
                    <ul className='collection'>
                      <li class='collection-header'>
                        <h5>Instructions</h5>
                      </li>{" "}
                      {data.recipe.source.map((item, index) => {
                        return (
                          <li class='collection-item'>{`${
                            index + 1
                          } -${item}`}</li>
                        );
                      })}
                    </ul>
                  ) : (
                    <a
                      href='#'
                      onClick={() => {
                        openUrl(data.recipe.url);
                      }}
                    >
                      Cooking Instructions from {data.recipe.source}
                    </a>
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
          <h5>
            No recipes saved yet, search for recipes on the{" "}
            <a href='/recipies'>search recipes page</a>{" "}
          </h5>
        </div>
      </div>
    )
  ) : (
    <Spinner />
  );
};

export default SavedRecipesView;
