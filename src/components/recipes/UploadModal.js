import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Spinner from "../layout/Spinner";
import axios from "axios";
import NutritionTable from "./NutritionTable";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import M from "materialize-css/dist/js/materialize.min";

import { useFileUpload } from "use-file-upload";
import RecipesContext from "../../context/recipes/RecipesContext";
import { makeStyles } from "@material-ui/core/styles";
import MessagesContext from "../../context/messages/MessagesContext";

export default function UploadModal({ open, handleClose, timetoken }) {
  const [file, setFile] = useState(null);

  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { sendFile },
    newImageFile,
  } = messagesContext;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      console.log("No file is selected");
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      setFile(files[0]);
      // console.log("File content:", e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };
  //console.log(timetoken);
  const sendUserFile = (file, e, timetoken) => {
    e.preventDefault();
    sendFile(file, timetoken);
    handleClose();
    M.toast({ html: "Image Submitted" });
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Upload Image</DialogTitle>
        <DialogContent>
          <div className='row'>
            <form action='#'>
              <div class='file-field input-field'>
                <div class='btn'>
                  <span>File</span>
                  <input
                    type='file'
                    onChange={(e) => {
                      onChangeFile(e);
                    }}
                  />
                </div>
                <div class='file-path-wrapper'>
                  <input class='file-path validate' type='text' />
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              sendUserFile(file, e, timetoken);
            }}
            color='primary'
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
