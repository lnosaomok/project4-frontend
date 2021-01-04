import React, { useState, useContext } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "../layout/Spinner";
import axios from "axios";
import NutritionTable from "./NutritionTable";
import Chip from "@material-ui/core/Chip";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import { useFileUpload } from "use-file-upload";
import RecipesContext from "../../context/recipes/RecipesContext";
import M from "materialize-css/dist/js/materialize.min";
import AlertContext from "../../context/alert/AlertContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngr, setRecipeIngr] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const recipesContext = useContext(RecipesContext);
  const { saveRecipe } = recipesContext;

  const onChangeRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  const onChangeRecipeImage = (e) => {
    setFile(e.target.value);
  };

  const onChangeRecipeIngr = (e) => {
    setRecipeIngr(e.target.value);
  };

  const instructionValues = [];

  const onSubmit = async (e) => {
    e.preventDefault(e);
    //// get the values of all the "steps" elements
    await document.querySelectorAll("#step0").forEach((item) => {
      instructionValues.push(item.value);
    });

    if (recipeIngr === "" || recipeName === "") {
      M.toast({ html: "Please fill out all required fields" });
    } else if (file === "") {
      setAlert("Please add an image file link", "danger");
      M.toast({ html: "Please add an image file link" });
    } else if (instructionValues.includes("")) {
      M.toast({ html: "Please complete all instruction steps" });
    } else {
      let recipe = {
        calories: nutritionInfo.calories,
        label: recipeName,
        ingredientLines: recipeIngr.split(","),
        image: file,
        recipe_yield: nutritionInfo.yield,
        source: instructionValues,
        allNutrients: Object.values(nutritionInfo.totalDaily),
        diet_labels: nutritionInfo.dietLabels,
      };

      /////"personal type indicated the user created the recipe"
      let type = "personal";
      saveRecipe({ recipe, type });
      M.toast({ html: "Recipe Created!" });
    }
  };

  const TextArea = () => {
    return (
      <>
        <div id='step'>
          {" "}
          <div>
            {" "}
            <TextareaAutosize
              aria-label='minimum height'
              rowsMin={2}
              placeholder='Type cooking step'
              name={`step${count}`}
              id={`step${count}`}
            />
            <div>
              <Button
                href='#text-buttons'
                color='primary'
                onClick={() => {
                  addStep();
                }}
              >
                Add another step
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const displayTextArea = [TextArea()];
  const [textAreas, setTextAreas] = useState(displayTextArea);

  const addStep = () => {
    setTextAreas((textAreas) => [...textAreas, TextArea()]);
    setCount(count + 1);
  };

  const getRecipeNutrition = () => {
    if (recipeIngr === "" || recipeIngr.split(",").length < 2) {
      setAlert("you must have at least two ingredients", "danger");
    } else if (recipeName === "") {
      setAlert("recipe must have name to get nutrition data", "danger");
    } else {
      let ingredients = recipeIngr.split(",");
      const reqObj = { title: recipeName, ingr: ingredients };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_NUTRITION_API_ID}&app_key=${process.env.REACT_APP_NUTRITION_API_KEY}`;
      setLoading(true);

      axios.post(url, reqObj, config).then(function (response, error) {
        if (error) {
          setError(error);
          console.log(error, "erro");
        }
        setNutritionInfo(response.data);
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div class='container' id='container'>
        <h4 className='special-font'>Add New Recipe</h4>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div class='row'>
            <div class='input-field col s6'>
              <input
                value={recipeName}
                onChange={(e) => {
                  onChangeRecipeName(e);
                }}
                name='name'
                id='first_name2'
                type='text'
                class='validate'
                autoComplete='off'
              />

              <FormHelperText id='outlined-weight-helper-text'>
                <Typography variant='subtitle1' gutterBottom>
                  Recipe Name (required)
                </Typography>
              </FormHelperText>
            </div>
          </div>

          <div class='row'>
            <div class='input-field col s6'>
              <input
                value={file}
                onChange={(e) => {
                  onChangeRecipeImage(e);
                }}
                name='image'
                id='image'
                type='text'
                class='validate'
                autoComplete='off'
              />

              <FormHelperText id='outlined-weight-helper-text'>
                <Typography variant='subtitle1' gutterBottom>
                  Recipe Image Link (required, image must show what recipe will
                  yield )
                </Typography>
              </FormHelperText>
            </div>
          </div>

          <div class='row '>
            <div class='input-field col s6'>
              <TextareaAutosize
                value={recipeIngr}
                onChange={(e) => {
                  onChangeRecipeIngr(e);
                }}
                aria-label='minimum height'
                rowsMin={3}
                placeholder='Minimum 2 Ingredients'
              />
              <FormHelperText id='outlined-weight-helper-text'>
                <Typography variant='subtitle1' gutterBottom>
                  Enter Comma-separated list of ingredients (required)
                </Typography>
              </FormHelperText>
            </div>
            <Button
              href='#text-buttons'
              color='primary'
              id='generate'
              onClick={() => {
                getRecipeNutrition();
              }}
            >
              Generate Ingredients Nutrition Data
            </Button>
          </div>

          <div>
            {loading && <Spinner />}
            {!loading && nutritionInfo !== null && (
              <>
                <div>
                  <h5>Calories: {nutritionInfo.calories}</h5>
                  <h6>Number of servings {nutritionInfo.yield}</h6>
                </div>
                <div>
                  <div className='nutrition-chips'>
                    {" "}
                    {nutritionInfo.dietLabels &&
                      nutritionInfo.dietLabels.map((label) => {
                        return <Chip label={label} color='primary' />;
                      })}
                  </div>
                  <NutritionTable
                    allNutrients={Object.values(nutritionInfo.totalDaily)}
                  />
                </div>
              </>
            )}

            {error && (
              <p className='error-text'>
                Could not fetch nutrition data. Make sure you have valid
                ingredients
              </p>
            )}
          </div>
          <div class='row'>
            <div class='input-field col s12'>
              {" "}
              <Typography variant='body1' gutterBottom>
                Cooking Instructions
              </Typography>
              {textAreas &&
                textAreas.map((element) => {
                  return element;
                })}
            </div>
          </div>
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            className={classes.button}
            disabled={nutritionInfo === null}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
