import React, { useState, useContext } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "../layout/Spinner";
import axios from "axios";
import NutritionTable from "./NutritionTable";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import { v4 as uuidv4 } from "uuid";
import { useFileUpload } from "use-file-upload";
import RecipesContext from "../../context/recipes/RecipesContext";
import M from "materialize-css/dist/js/materialize.min";

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngr, setRecipeIngr] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [count, setCount] = useState(0);
  // const [file, setFile] = useState(null);
  const [file, selectFile] = useFileUpload();
  const recipesContext = useContext(RecipesContext);
  const { recipe_result, saved_recipes, saveRecipe } = recipesContext;
  const onChangeRecipeName = (e) => {
    setRecipeName(e.target.value);
  };

  const onChangeRecipeIngr = (e) => {
    setRecipeIngr(e.target.value);
  };

  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      console.log("No file is selected");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      //setFile(files[0]);
      // console.log("File content:", e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const instructionValues = [];
  const onSubmit = async (e) => {
    e.preventDefault(e);
    document.querySelectorAll("#step0").forEach((item) => {
      instructionValues.push(item.value);
    });
    console.log(instructionValues);
    console.log(file);
    let recipe = {
      calories: nutritionInfo.calories,
      label: recipeName,
      ingredientLines: recipeIngr.split(","),
      image: file.source,
      recipe_yield: nutritionInfo.yield,
      source: instructionValues,
      allNutrients: Object.values(nutritionInfo.totalDaily),
      diet_labels: nutritionInfo.dietLabels,
      url: "##",
    };

    let type = "search";
    M.toast({ html: "Recipe Created!" });
    await saveRecipe({ recipe, type });
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
    let ingredients = recipeIngr.split(",");
    const reqObj = { title: recipeName, ingr: ingredients };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(ingredients);
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_NUTRITION_API_ID}&app_key=${process.env.REACT_APP_NUTRITION_API_KEY}`;
    setLoading(true);

    axios.post(url, reqObj, config).then(function (response) {
      console.log(response);
      setNutritionInfo(response.data);
    });
    setLoading(false);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  console.log(file);

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
              {/* <button
                onClick={() => {
                  // Single File Upload
                  selectFile();
                }}
              >
                Click to Upload
              </button> */}

              <FormHelperText id='outlined-weight-helper-text'>
                <Typography variant='subtitle1' gutterBottom>
                  Recipe Name
                </Typography>
              </FormHelperText>
            </div>
          </div>

          <div className='row'>
            <Button
              variant='contained'
              color='grey'
              id='focus-transparent'
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                // Single File Upload
                selectFile();
              }}
            >
              Upload Recipe Image
            </Button>
            <div className='img-div'>
              {" "}
              {file ? (
                <div>
                  <img src={file.source} alt='preview' />
                </div>
              ) : (
                <span> No file selected</span>
              )}
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
                  Ingredients List
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
              Generate Nutrition Data
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
