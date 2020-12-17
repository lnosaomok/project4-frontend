import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MessagesContext from "../../context/messages/MessagesContext";

import { useState } from "react";

export default function RatingModal({ open, handleClose, timetoken }) {
  const [value, setValue] = React.useState(0);
  const [ratingMessage, setRatingMessage] = useState("");
  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: {
      fetchMessages,
      publish,
      sendFile,
      addListener,
      addMessageAction,
      getMessageActions,
      getFile,
    },
    getReccomendedRecipes,
    reccommended_recipes,
    loading,
  } = messagesContext;

  const StyledRating = withStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
  })(Rating);

  const submitRating = async () => {
    let channel = "RECCOMENDATIONS_CHANNEL";
    await addMessageAction(channel, timetoken, value);
    await addMessageAction(channel, timetoken, ratingMessage);
    handleClose();
  };

  const onChangeRatingMessage = (e) => {
    setRatingMessage(e.target.value);
  };

  const onChangeRating = (e) => {
    setValue(e.target.value);
  };
  console.log(timetoken);
  return (
    <div>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Rating</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give your feedback on this recipe.
          </DialogContentText>
          <StyledRating
            name='customized-color'
            value={value}
            defaultValue={0}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={1}
            icon={<FavoriteIcon fontSize='inherit' />}
            onChange={(e) => {
              onChangeRating(e);
            }}
          />

          <DialogContentText> Review Message</DialogContentText>

          <TextareaAutosize
            aria-label='minimum height'
            rowsMin={3}
            placeholder='Type Review'
            value={ratingMessage}
            onChange={(e) => {
              onChangeRatingMessage(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>
            Close
          </Button>
          <Button
            color='primary'
            onClick={() => {
              submitRating();
            }}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
