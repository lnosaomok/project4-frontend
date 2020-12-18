import { useEffect, useContext } from "react";
import MessagesContext from "../context/messages/MessagesContext";
//import { pubsub } from "../context/messages/MessagesState";

const useInitializeListeners = () => {
  const messagesContext = useContext(MessagesContext);
  const {
    addRecipeRecommendation,
    pubsub,
    addRating,
    newImageFile,
    addPost,
    addPostReply,
  } = messagesContext;

  useEffect(() => {
    pubsub.addListener({
      message: (messageObject) => {
        const { channel, message, timetoken } = messageObject;
        const obj = {
          channel,
          message,
          timetoken,
        };
        console.log("Received message", messageObject, "channel", channel);
        if (channel === "RECCOMENDATIONS_CHANNEL") {
          addRecipeRecommendation(obj);
        } else if (channel === "ALL_USERS") {
          addPost(obj);
        }
      },
      messageAction: (messageObject) => {
        //  console.log("ReceivedACTION", messageObject);
        const {
          actionTimetoken,
          messageTimetoken,
          value,
          channel,
        } = messageObject.data;
        const val = { actionTimetoken, messageTimetoken, value };

        // if (channel === "RECCOMENDATIONS_CHANNEL") {
        //   addRating(val);
        // } else if (channel === "ALL_USERS") {
        addPostReply(val);
        console.log("added");
        //  }
      },

      file: (messageObject) => {
        let messageAndFile = {};
        messageAndFile.message = messageObject.message;
        messageAndFile.file = messageObject.file;
        messageAndFile.channel = messageObject.channel;
        messageAndFile.timetoken = messageObject.timetoken;

        newImageFile(messageAndFile);
        console.log(messageAndFile);
      },
    });
  }, []);
};

export default useInitializeListeners;
