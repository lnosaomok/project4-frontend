import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import RecipesContext from "../../context/recipes/RecipesContext";
import Spinner from "../../components/layout/Spinner";
import NutritionTable from "./NutritionTable";
import Chip from "@material-ui/core/Chip";
import M from "materialize-css/dist/js/materialize.min";

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

export default function SavedRecipes(props) {
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

  const classes = useStyles();

  const onClick = (e) => {
    console.log(e.target.id);
    e.stopPropagation();
    //this.props.history.push(`/searchrecipes${e}`);
  };

  return saved_recipes !== null && !loading ? (
    saved_recipes.length > 0 ? (
      <>
        <div className={classes.root}>
          <CssBaseline />

          <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor='left'
          >
            <div className={classes.toolbar} />
            <Typography>
              {" "}
              <h5>My Saved Recipes</h5>
            </Typography>
            <List>
              {saved_recipes.map((recipe, index) => (
                <>
                  <Divider />
                  <ListItem
                    button
                    key={recipe.recipe.label}
                    id={index}
                    onClick={(e) => {
                      onClick(e);
                    }}
                  >
                    <ListItemText primary={recipe.recipe.label} id={index} />
                  </ListItem>
                </>
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div class='favourites'>
              <div class='col s12 m12'>
                <div class='title-label'>
                  <h4>
                    {saved_recipes[props.match.params.index].recipe.label}
                  </h4>
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

        <div id='nutrition'>
          <div id='table'>
            {" "}
            <NutritionTable
              allNutrients={
                saved_recipes[props.match.params.index].recipe.allNutrients
              }
              healthLabels={
                saved_recipes[props.match.params.index].recipe.diet_labels
              }
            />
          </div>
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
