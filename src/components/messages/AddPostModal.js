import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MessagesContext from "../../context/messages/MessagesContext";
import AuthContext from "../../context/auth/AuthContext";
import M from "materialize-css/dist/js/materialize.min.js";

export default function AddPostModal({ open, handleClose }) {
  const [postMessage, setPostMessage] = useState("");
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { fetchMessages, publish, addPost },
  } = messagesContext;
  const onChangePostMessage = (e) => {
    setPostMessage(e.target.value);
  };

  const publistPost = () => {
    let channel = "ALL_USERS";
    publish(
      {
        postMessage,
        name: user.username,
        date: Date.now(),
      },
      channel
    );
    M.toast({ html: "Post Added" });
    setPostMessage("");
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask a question, share nutrition info etc
          </DialogContentText>
          <TextareaAutosize
            aria-label='minimum height'
            rowsMin={3}
            placeholder='Type Post'
            value={postMessage}
            onChange={(e) => {
              onChangePostMessage(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={publistPost} color='primary'>
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
