import React, { useReducer } from "react";
import MessagesContext from "./MessagesContext";
import MessagesReducer from "./MessagesReducer";
import PubNub from "pubnub";
import pubnubConfig from "../../pubnub.config.json";
import {
  ADD_RECCOMENDED_RECIPE,
  GET_RECCOMENDED_RECIPES,
  ADD_RECIPE_RATING,
  GET_RECIPE_RATINGS,
  GET_IMAGE_FILES,
  NEW_IMAGE_FILE,
  FILTER_RECOMMENDED_RECIPES,
  CLEAR_FILTERED_RECOMMENDED_RECIPES,
  GET_ALL_POSTS,
  ADD_POST,
  ADD_POST_REPLIES,
  GET_POST_REPLIES,
} from "../types";

/// SET UP CHANNELS
const RECCOMENDATIONS_CHANNEL = "RECCOMENDATIONS_CHANNEL";
const FILE_CHANNEL = "FILE_CHANNEL";
const ALL_USERS1 = "ALL_USERS1";

//SET UP PUB/SUB CONFIGURATION METHODS
//////////////////////////&&&///////////////////////////////////
const pubnub = new PubNub(pubnubConfig);

function PubSub() {
  pubnub.subscribe({
    channels: [RECCOMENDATIONS_CHANNEL, FILE_CHANNEL, ALL_USERS1],
  });

  this.addListener = (listenerConfig) => {
    pubnub.addListener(listenerConfig);
  };

  this.publish = (message, channel) => {
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
      channel: channel,
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

  this.sendFile = async (file, timetoken) => {
    const result = await pubnub.sendFile({
      channel: FILE_CHANNEL,
      file: file,
      message: {
        test: "message",
        value: timetoken,
      },
    });
  };

  this.getFile = (channel, id, name) => {
    console.log(name);
    console.log(id);
    console.log(channel);
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
    filtered_recommended_recipes: null,
    postReplies: [],
    error: null,
    loading: true,
    pubsub: pubsub,
    recipeRatings: [],
    imageFilesList: [],
    allPosts: [],
  };

  const [state, dispatch] = useReducer(MessagesReducer, initialState);

  const addRecipeRecommendation = (obj) => {
    dispatch({
      type: ADD_RECCOMENDED_RECIPE,
      item: obj,
    });
  };

  const getReccomendedRecipes = () => {
    pubnub
      .fetchMessages({
        channels: [RECCOMENDATIONS_CHANNEL],
        count: 75,
      })
      .then(async (res) => {
        dispatch({
          type: GET_RECCOMENDED_RECIPES,
          item: res.channels.RECCOMENDATIONS_CHANNEL,
        });
      });
  };

  const addPost = (obj) => {
    dispatch({
      type: ADD_POST,
      item: obj,
    });
  };

  const getAllPosts = () => {
    pubnub
      .fetchMessages({
        channels: ["ALL_USERS1"],
        count: 75,
      })
      .then(async (res) => {
        dispatch({
          type: GET_ALL_POSTS,
          item: res.channels.ALL_USERS1,
        });
      });
  };

  const addPostReply = (obj) => {
    dispatch({
      type: ADD_POST_REPLIES,
      item: obj,
    });
  };

  const getPostReplies = () => {
    pubnub
      .getMessageActions({
        channel: ALL_USERS1,
      })
      .then(async (res) => {
        dispatch({
          type: GET_POST_REPLIES,
          item: res.data,
        });
      });
  };

  const newImageFile = (obj) => {
    let urlsArr = {};

    let imgVal = pubnub.getFileUrl({
      channel: "FILE_CHANNEL",
      id: obj.file.id,
      name: obj.file.name,
    });
    let messageVal = obj.message;

    // urlsArr.push({ imgVal, messageVal, timetoken: obj.timetoken });

    dispatch({
      type: NEW_IMAGE_FILE,
      item: {
        channel: obj.channel,
        imgVal,
        messageVal,
        timetoken: obj.timetoken,
      },
    });
  };
  const getImageFiles = async (channel) => {
    const imagefiles = await pubnub.fetchMessages({
      channels: [FILE_CHANNEL],

      count: 175, // default/max is 25
    });

    let urlsArr = [];
    if (imagefiles && imagefiles.channels.FILE_CHANNEL !== undefined) {
      imagefiles.channels.FILE_CHANNEL.forEach((element) => {
        let imgVal = pubnub.getFileUrl({
          channel: "FILE_CHANNEL",
          id: element.message.file.id,
          name: element.message.file.name,
        });

        let messageVal = element.message.message;

        urlsArr.push({ imgVal, messageVal, timetoken: element.timetoken });
      });
    }

    await dispatch({
      type: GET_IMAGE_FILES,
      item: urlsArr,
    });
  };

  const addRating = (obj) => {
    dispatch({
      type: ADD_RECIPE_RATING,
      item: obj,
    });
  };

  const getRatings = () => {
    pubnub
      .getMessageActions({
        channel: RECCOMENDATIONS_CHANNEL,
      })
      .then(async (res) => {
        dispatch({
          type: GET_RECIPE_RATINGS,
          item: res.data,
        });
      });
  };

  const filterRecommendedRecipes = (text) => {
    dispatch({ type: FILTER_RECOMMENDED_RECIPES, payload: text });
  };

  const clearFilteredRecommendedRecipes = () => {
    dispatch({ type: CLEAR_FILTERED_RECOMMENDED_RECIPES });
  };

  return (
    <MessagesContext.Provider
      value={{
        pubsub: state.pubsub,
        recipeRatings: state.recipeRatings,
        postReplies: state.postReplies,
        reccommended_recipes: state.reccommended_recipes,
        filtered_recommended_recipes: state.filtered_recommended_recipes,
        filterRecommendedRecipes,
        allPosts: state.allPosts,
        clearFilteredRecommendedRecipes,
        filterRecommendedRecipes,
        error: state.error,
        imageFilesList: state.imageFilesList,
        loading: state.loading,
        addRecipeRecommendation,
        getReccomendedRecipes,
        addRating,
        getRatings,
        getImageFiles,
        newImageFile,
        addPost,
        getAllPosts,
        getPostReplies,
        addPostReply,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};
