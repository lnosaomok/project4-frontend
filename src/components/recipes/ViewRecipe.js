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

  const { data } = props.location;

  const saveRecipeItem = () => {
    let type = "recommended";
    saveRecipe({ recipe: data.recipe.recipe, type, timetoken: data.timetoken });
    M.toast({ html: "Saved" });
  };

  console.log(data);
  return (
    <>
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
                  <img
                    class=' s12 m12 inner-img'
                    id='activator'
                    src={data.recipe.recipe.image}
                  />
                </div>
                <a
                  class='waves-effect waves-light modal-trigger'
                  href='#modal2'
                >
                  Nutrition Information
                </a>
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

        <div id='nutrition'>
          <div id='table'>
            {" "}
            <NutritionTable
              allNutrients={data.recipe.recipe.allNutrients}
              healthLabels={data.recipe.recipe.diet_labels}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
