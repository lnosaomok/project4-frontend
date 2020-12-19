import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import M from "materialize-css/dist/js/materialize.min";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MessagesContext from "../../../context/messages/MessagesContext";
import AuthContext from "../../../context/auth/AuthContext";
import RecipesContext from "../../../context/recipes/RecipesContext";

import { useState } from "react";

export default function RatingModal({ open, handleClose, timetoken, id }) {
  const [value, setValue] = React.useState(0);
  const [ratingMessage, setRatingMessage] = useState("");
  const recipesContext = useContext(RecipesContext);
  const { updateRating } = recipesContext;
  const messagesContext = useContext(MessagesContext);

  const {
    pubsub: { addMessageAction },
  } = messagesContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const StyledRating = withStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
  })(Rating);

  const submitRating = async () => {
    if (ratingMessage === "" || value === "0") {
      M.toast({ html: "please fill in rating details" });
    } else {
      let channel = "RECCOMENDATIONS_CHANNEL";
      let date = new Date();
      let year = date.getFullYear().toString();
      let month = date.getMonth().toString();
      let day = date.getDay().toString();

      date = `${month}/${day}/${year}`;
      await addMessageAction(channel, timetoken, `${value}`);
      await addMessageAction(channel, timetoken, `$${ratingMessage}`);
      await addMessageAction(channel, timetoken, `%${date}`);
      await addMessageAction(channel, timetoken, `@${user.username}`);

      updateRating({ id });
      M.toast({ html: "Rating added!" });
      handleClose();
    }
  };

  const onChangeRatingMessage = (e) => {
    setRatingMessage(e.target.value);
  };

  const onChangeRating = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Rating</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give your feedback on this recipe. (multiple ratings not
            allowed, only the first rating will be shown)
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
