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
import Spinner from "../../components/layout/Spinner";
import NutritionTable from "./NutritionTable";
import M from "materialize-css/dist/js/materialize.min";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NutritionModal from "./NutritionModal";
import Button from "@material-ui/core/Button";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data } = props.location;

  const saveRecipeItem = () => {
    let type = "recommended";
    saveRecipe({ recipe: data.recipe.recipe, type, timetoken: data.timetoken });
    M.toast({ html: "Saved" });
  };
  const {
    messageCounts,
    recipeRatingsMessages,
    recipeRatingsStars,
    starCounts,
  } = data;
  console.log(data);
  return (
    <>
      <NutritionModal
        allNutrients={data.recipe.recipe.allNutrients}
        open={open}
        handleClose={handleClose}
        healthLabels={data.recipe.recipe.diet_labels}
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
                    <h4>{data.recipe.recipe.label}</h4>
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
                    {data.recipe.recipe.diet_labels.map((label) => {
                      return <Chip label={label} color='primary' />;
                    })}
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
                    {" "}
                    <Typography>
                      {messageCounts === 0
                        ? ""
                        : messageCounts === 1
                        ? `${messageCounts} Review`
                        : `${messageCounts} Reviews`}
                    </Typography>
                    {"  "}
                    <a href=''>Read reviews</a>
                  </div>

                  <img
                    class=' s12 m12 inner-img'
                    id='activator'
                    src={data.recipe.recipe.image}
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

                    {data.recipe.recipe.ingredientLines.map((one, index) => {
                      return <li class='collection-item'>{one}</li>;
                    })}
                  </ul>

                  <a
                    href='#'
                    onClick="window.open('<%=element.favourite.url%>', '_blank');"
                  >
                    Cooking Instructions from
                    {data.recipe.recipe.url}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
