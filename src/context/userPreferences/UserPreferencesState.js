import React, { useReducer, useContext } from "react";
import UserPreferencesContext from "./UserPreferencesContext";
import UserPreferencesReducer from "./UserPreferencesReducer";
import axios from "axios";

import {
  SET_USER_PREFERENCES,
  GENERAL_ERROR,
  GET_USER_PREFERENCES,
} from "../types";

const UserPreferencesState = (props) => {
  const initialState = {
    userPreferences: {
      fatMacro: "",
      carbsMacro: "",
      proteinMacro: "",
      sugarMacro: "",
      calories: "",
      channels: ["VEGAN_RECIPES_CHANNEL"],
      diet: "vegan",
    },
    error: null,
  };

  const [state, dispatch] = useReducer(UserPreferencesReducer, initialState);

  const getUserPreferences = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/getUserPreferences`
      );
      dispatch({
        type: GET_USER_PREFERENCES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: GENERAL_ERROR });
    }
  };

  const setUserPreferences = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/setUserPreferences`,
        formData,
        config
      );

      dispatch({
        type: SET_USER_PREFERENCES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GENERAL_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  return (
    <UserPreferencesContext.Provider
      value={{
        userPreferences: state.userPreferences,
        error: state.error,
        getUserPreferences,
        setUserPreferences,
      }}
    >
      {props.children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesState;
