import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import RecipesContext from "../../context/recipes/RecipesContext";
import M from "materialize-css/dist/js/materialize.min";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NutritionModal from "../recipes/Modals/NutritionModal";
import Button from "@material-ui/core/Button";
import ImagesViewModal from "../recipes/Modals/ImagesViewModal";
import Spinner from "../layout/Spinner";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const drawerWidth = 240;

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

const ViewRecipe = (props) => {
  const classes = useStyles();
  const recipesContext = useContext(RecipesContext);
  const { saveRecipe } = recipesContext;
  const [openNutritionModal, setOpenNutritionModal] = React.useState(false);
  const [openImagesModal, setOpenImagesModal] = React.useState(false);

  ////// handle modal open/close state
  const handleClickImagesModalOpen = () => {
    setOpenImagesModal(true);
  };

  const handleCloseImagesModal = () => {
    setOpenImagesModal(false);
  };

  const handleClickNutritionModalOpen = () => {
    setOpenNutritionModal(true);
  };

  const handleCloseNutritionModal = () => {
    setOpenNutritionModal(false);
  };

  ////////// known issue; page will error out on refresh because props values are lost on refresh. Issue still open
  const { data } = props.location;
  if (data) {
    localStorage.setItem("recipeDataView", JSON.stringify(data));
  }

  let recipeDataItem = localStorage.recipeDataView
    ? JSON.parse(localStorage.recipeDataView)
    : null;

  const saveRecipeItem = () => {
    let type = "recommended";
    saveRecipe({
      recipe: recipeDataItem.recipe.recipe,
      type,
      timetoken: recipeDataItem.timetoken,
    });
    M.toast({ html: "Saved" });
  };
  const { recipeRatingsStars, starCounts } = recipeDataItem;
  const openUrl = (url) => {
    window.open(`${url}`, `blank`);
  };
  return (
    <>
      {recipeDataItem ? (
        <div>
          <NutritionModal
            allNutrients={recipeDataItem.recipe.recipe.allNutrients}
            open={openNutritionModal}
            handleClose={handleCloseNutritionModal}
            healthLabels={recipeDataItem.recipe.recipe.diet_labels}
          />
          <ImagesViewModal
            open={openImagesModal}
            handleClose={handleCloseImagesModal}
            allImages={recipeDataItem.allImages}
          />
          <div className='card container' id='container'>
            <div className={classes.root}>
              <CssBaseline />

              <main className={classes.content}>
                <div className={classes.toolbar} />
                <div class='favourites'>
                  <div class='col s12 m12'>
                    <div class='title-label'>
                      <div className='title-bar'>
                        <h4>{recipeDataItem.recipe.recipe.label}</h4>
                        <button
                          className='btn-flat'
                          onClick={() => {
                            saveRecipeItem();
                          }}
                        >
                          Save Recipe
                        </button>
                      </div>
                      <div className='nutrition-chips'>
                        {" "}
                        {recipeDataItem.recipe.recipe.diet_labels.map(
                          (label) => {
                            return <Chip label={label} color='primary' />;
                          }
                        )}
                      </div>
                      <div className='rating-text'>
                        {starCounts > 0 && (
                          <StyledRating
                            name='customized-color'
                            value={recipeRatingsStars}
                            defaultValue={0}
                            readOnly
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            precision={0.1}
                            icon={<FavoriteIcon fontSize='inherit' />}
                          />
                        )}

                        <Typography>
                          {starCounts === 0
                            ? ""
                            : starCounts === 1
                            ? `${starCounts} Rating`
                            : `${starCounts} Ratings`}
                        </Typography>
                      </div>

                      <div class='review'>
                        <Button
                          variant='outlined'
                          color='primary'
                          id='focus-transparent'
                          onClick={handleClickImagesModalOpen}
                        >
                          View Submitted Images
                        </Button>
                      </div>

                      <img
                        class=' s12 m12 inner-img'
                        id='activator'
                        src={recipeDataItem.recipe.recipe.image}
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

                        {recipeDataItem.recipe.recipe.ingredientLines.map(
                          (one, index) => {
                            return <li class='collection-item'>{one}</li>;
                          }
                        )}
                      </ul>
                      {Array.isArray(recipeDataItem.recipe.recipe.source) ? (
                        <ul className='collection'>
                          <li class='collection-header'>
                            <h5>Instructions</h5>
                          </li>{" "}
                          {recipeDataItem.recipe.recipe.source.map(
                            (item, index) => {
                              return (
                                <li class='collection-item'>{`${
                                  index + 1
                                } -${item}`}</li>
                              );
                            }
                          )}
                        </ul>
                      ) : (
                        <a
                          href='#'
                          onClick={() => {
                            openUrl(recipeDataItem.recipe.recipe.url);
                          }}
                        >
                          Cooking Instructions from{" "}
                          {recipeDataItem.recipe.recipe.source}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>{" "}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ViewRecipe;
