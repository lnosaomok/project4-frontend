import React, { useEffect, useContext } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "../../App.css";
import AlertContext from "../../context/alert/AlertContext";
import UserPreferencesContext from "../../context/userPreferences/UserPreferencesContext";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "15ch",
  },
}));

const UpdatePreferences = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const userPreferencesContext = useContext(UserPreferencesContext);
  const {
    userPreferences,
    error,
    getUserPreferences,
    setUserPreferences,
  } = userPreferencesContext;
  useEffect(async () => {
    await getUserPreferences();
  }, []);
  useEffect(async () => {
    await getUserPreferences();
  }, []);

  const classes = useStyles();
  const [macroValues, setMacroValues] = React.useState({
    fatMacro: userPreferences.fatMacro,
    carbsMacro: userPreferences.carbsMacro,
    proteinMacro: userPreferences.proteinMacro,
    sugarMacro: userPreferences.sugarMacro,
    calories: userPreferences.calories,
  });
  const [diet, setDiet] = useState(userPreferences.diet);
  const [channels, setChannels] = useState(userPreferences.channels);

  useEffect(() => {
    document.querySelectorAll("input[type='checkbox']").forEach((obj) => {
      if (channels.includes(obj.value)) {
        obj.checked = true;
      }
    });
  }, []);

  const onDietChange = (e) => {
    setDiet(e);
    // console.log(e);
  };

  const onChannelChange = (e) => {
    let checkedboxes = [];
    document.querySelectorAll("input[type='checkbox']").forEach((obj) => {
      if (obj.checked) {
        checkedboxes.push(obj.value);
      }
    });
    setChannels(checkedboxes);
  };
  const {
    fatMacro,
    carbsMacro,
    proteinMacro,
    sugarMacro,
    calories,
  } = macroValues;

  const onChangeMacroValues = (e) => {
    setMacroValues({ ...macroValues, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (document.querySelector("#diet")) {
      document.querySelector("#diet").children[0].children[0].style.color =
        "grey";
      document.querySelector("#diet").children[0].children[1].style.color =
        "grey";
      document.querySelector("#diet").children[0].children[2].style.color =
        "grey";
      document.querySelector("#diet").children[0].children[3].style.color =
        "grey";
      document.querySelector("#diet").children[0].children[4].style.color =
        "grey";
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setUserPreferences({
      fatMacro,
      sugarMacro,
      carbsMacro,
      proteinMacro,
      calories,
      channels,
      diet,
    });

    if (!error) {
      props.history.push("/home");
    }
  };

  return (
    <div class='container' id='container'>
      <h4 className='special-font'>Next, tell us your preferences</h4>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <div id='space'>
          <span className='special-font-text'>
            What type of diet do you want to search recipes for? (required)
          </span>
        </div>
        <div id='diet'>
          {" "}
          <RadioGroup
            onChange={(e) => {
              onDietChange(e);
            }}
            horizontal
          >
            <RadioButton name='diet' value='vegan' checked={diet === "vegan"}>
              Vegan{" "}
            </RadioButton>
            <RadioButton name='diet' value='keto' checked={diet === "keto"}>
              Ketogenic{" "}
            </RadioButton>
            <RadioButton name='diet' value='paleo' checked={diet === "paleo"}>
              Paleo{" "}
            </RadioButton>
            <RadioButton
              name='diet'
              value='gluten-free'
              checked={diet === "gluten-free"}
            >
              Gluten-free{" "}
            </RadioButton>
            <RadioButton name='diet' value='all' checked={diet === "all"}>
              All diets{" "}
            </RadioButton>
          </RadioGroup>
        </div>

        <div id='space'>
          <span className='special-font-text'>
            What channels would you like to recieve suggested recipes from?
            (optional)
          </span>
        </div>
        <div className='check-group'>
          <p>
            <label>
              <input
                type='checkbox'
                value={"VEGAN_RECIPES_CHANNEL"}
                onChange={(e) => {
                  onChannelChange(e);
                }}
              />
              <span>Vegan Channel</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type='checkbox'
                value={"KETO_RECIPES_CHANNEL"}
                onChange={(e) => {
                  onChannelChange(e);
                }}
              />
              <span>Keto Channel</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type='checkbox'
                value={"GLUTEN_FREE_RECIPES_CHANNEL"}
                onChange={(e) => {
                  onChannelChange(e);
                }}
              />
              <span>Gluten-free Channel</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type='checkbox'
                value={"PALEO_RECIPES_CHANNEL"}
                onChange={(e) => {
                  onChannelChange(e);
                }}
              />
              <span>Paleo Channel</span>
            </label>
          </p>
        </div>
        <div id='space'>
          <span className='special-font-text' id='macros'>
            Tell us any macros you want to monitor (optional)
          </span>
        </div>
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <OutlinedInput
              id='outlined-adornment-weight'
              value={calories}
              name='calories'
              onChange={(e) => {
                onChangeMacroValues(e);
              }}
              endAdornment={
                <InputAdornment position='end'>kcal</InputAdornment>
              }
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                "aria-label": "calories",
              }}
              labelWidth={0}
            />
            <FormHelperText id='outlined-weight-helper-text'>
              Calories (Limit/Target)
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <OutlinedInput
              id='outlined-adornment-weight'
              value={fatMacro}
              name='fatMacro'
              onChange={(e) => {
                onChangeMacroValues(e);
              }}
              endAdornment={
                <InputAdornment position='end'>grams</InputAdornment>
              }
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                "aria-label": "fat",
              }}
              labelWidth={0}
            />
            <FormHelperText id='outlined-weight-helper-text'>
              Fat (Limit/Target)
            </FormHelperText>
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <OutlinedInput
              id='outlined-adornment-weight'
              value={carbsMacro}
              name='carbsMacro'
              onChange={(e) => {
                onChangeMacroValues(e);
              }}
              endAdornment={
                <InputAdornment position='end'>grams</InputAdornment>
              }
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                "aria-label": "carbs",
              }}
              labelWidth={0}
            />
            <FormHelperText id='outlined-weight-helper-text'>
              Carbs (Limit/Target)
            </FormHelperText>
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <OutlinedInput
              id='outlined-adornment-weight'
              value={proteinMacro}
              name='proteinMacro'
              onChange={(e) => {
                onChangeMacroValues(e);
              }}
              endAdornment={
                <InputAdornment position='end'>grams</InputAdornment>
              }
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                "aria-label": "proteinMacro",
              }}
              labelWidth={0}
            />
            <FormHelperText id='outlined-weight-helper-text'>
              Protein (Limit/Target)
            </FormHelperText>
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <OutlinedInput
              id='outlined-adornment-weight'
              value={sugarMacro}
              name='sugarMacro'
              onChange={(e) => {
                onChangeMacroValues(e);
              }}
              endAdornment={
                <InputAdornment position='end'>grams</InputAdornment>
              }
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                "aria-label": "sugar",
              }}
              labelWidth={0}
            />
            <FormHelperText id='outlined-weight-helper-text'>
              Sugar (Limit/Target)
            </FormHelperText>
          </FormControl>
        </div>
        <div className=''>
          <button className='button-btn waves-effect waves-light' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePreferences;
