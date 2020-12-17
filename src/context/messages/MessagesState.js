import React, { useReducer } from "react";
import MessagesContext from "./MessagesContext";
import MessagesReducer from "./MessagesReducer";
import { v4 as uuid } from "uuid";
import PubNub from "pubnub";
import pubnubConfig from "../../pubnub.config.json";
import {
  ADD_RECCOMENDED_RECIPE,
  GET_RECCOMENDED_RECIPES,
  ADD_RECIPE_RATING,
  GET_RECIPE_RATINGS,
} from "../types";

/// SET UP CHANNELS
const RECCOMENDATIONS_CHANNEL = "RECCOMENDATIONS_CHANNEL";
const Q_AND_A_CHANNEL = "Q_AND_A_CHANNEL";
const ALL_USERS = "user.*";

//SET UP PUB/SUB CONFIGURATION METHODS
//////////////////////////&&&///////////////////////////////////
const pubnub = new PubNub(pubnubConfig);

function PubSub() {
  pubnub.subscribe({
    channels: [RECCOMENDATIONS_CHANNEL, Q_AND_A_CHANNEL, ALL_USERS],
  });

  this.addListener = (listenerConfig) => {
    pubnub.addListener(listenerConfig);
  };

  this.publish = (message, channel) => {
    console.log(message);
    pubnub.publish(
      {
        message,
        channel: channel,
      },
      function (status, response) {
        console.log(status, response);
      }
    );
  };
  this.addMessageAction = (channel, messageToken, reactionObj) => {
    pubnub.addMessageAction({
      channel: RECCOMENDATIONS_CHANNEL,
      messageTimetoken: messageToken,
      action: {
        type: "reaction",
        value: reactionObj,
      },

      function(status, response) {
        console.log(status, response);
      },
    });
  };

  this.getMessageActions = (channel) => {
    pubnub.getMessageActions(
      {
        channel: channel,
        limit: 100,
      },
      function (status, response) {
        console.log(status, response);
      }
    );
  };

  this.sendFile = async (file, message, channel) => {
    const result = await pubnub.sendFile({
      channel: channel,
      message: message,
      file: file,
    });
  };

  this.getFile = (channel, id, name) => {
    const result = pubnub.getFileUrl({
      channel: channel,
      id: id,
      name: name,
    });
    return result;
  };
}

export const pubsub = new PubSub();
//////////////////////////&&&///////////////////////////////////

export const MessagesState = (props) => {
  const initialState = {
    reccommended_recipes: [],
    error: null,
    loading: true,
    pubsub: pubsub,
    recipeRatings: [],
  };

  const [state, dispatch] = useReducer(MessagesReducer, initialState);

  const addRecipeRecommendation = (obj) => {
    // console.log(obj);
    // dispatch({
    //   type: ADD_RECCOMENDED_RECIPE,
    //   item: obj,
    // });

    pubnub.deleteMessages(
      {
        channels: RECCOMENDATIONS_CHANNEL,
      },
      function (status, response) {
        console.log(status, response);
      }
    );
  };

  const getReccomendedRecipes = () => {
    pubnub
      .fetchMessages({
        channels: [RECCOMENDATIONS_CHANNEL],
        count: 75,
      })
      .then(async (res) => {
        console.log(res);
        dispatch({
          type: GET_RECCOMENDED_RECIPES,
          item: res.channels.RECCOMENDATIONS_CHANNEL,
        });
      });
  };

  // const getActions = (channel) => {
  //   pubnub
  //     .getMessageActions({
  //       channel: channel,
  //       limit: 100,
  //     })
  //     .then(async (res) => {
  //       console.log(res);
  //       if (channel === "CHANNEL1") {
  //         dispatch({
  //           type: GET_CHANNEL1_ACTIONS,
  //           item: res.data,
  //         });
  //       }
  //     });
  // };

  const addRating = (obj) => {
    console.log(obj);
    dispatch({
      type: ADD_RECIPE_RATING,
      item: obj,
    });
  };

  const getRatings = () => {
    //console.log(obj);
    pubnub
      .getMessageActions({
        channel: RECCOMENDATIONS_CHANNEL,
      })
      .then(async (res) => {
        console.log(res);
        dispatch({
          type: GET_RECIPE_RATINGS,
          item: res.data,
        });
      });
  };

  return (
    <MessagesContext.Provider
      value={{
        pubsub: state.pubsub,
        recipeRatings: state.recipeRatings,
        reccommended_recipes: state.reccommended_recipes,
        error: state.error,
        loading: state.loading,
        addRecipeRecommendation,
        getReccomendedRecipes,
        addRating,
        getRatings,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};
