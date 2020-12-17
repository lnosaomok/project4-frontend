import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import NutritionTable from "./NutritionTable";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import MessagesContext from "../../context/messages/MessagesContext";

import { useState } from "react";

export default function NutritionModal({
  open,
  handleClose,
  allNutrients,
  healthLabels,
}) {
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

  return (
    <div>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className='nutrition-header'>
            <div>
              {" "}
              <h4 className='special-font'>Nutrition Information</h4>
            </div>
            <DialogActions>
              <Button color='primary' onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </div>

          <div>
            <div id='nutrition'>
              <div className='nutrition-chips'>
                {" "}
                {healthLabels &&
                  healthLabels.map((label) => {
                    return <Chip label={label} color='primary' />;
                  })}
              </div>{" "}
              <NutritionTable
                allNutrients={allNutrients}
                healthLabels={healthLabels}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
