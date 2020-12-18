import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImageTileList from "./ImageTileList";
export default function ImagesViewDialog({ open, handleClose, allImages }) {
  console.log(allImages);

  let tileData = [];
  allImages.forEach((element) => {
    tileData.push({
      img: element.imgVal,
      title: "Image",
      author: "author",
      cols: 1,
    });
  });

  console.log(tileData);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Recipe Image Submissions
        </DialogTitle>
        {tileData.length < 1 ? <h6>No images yet</h6> : ""}
        <DialogContent>
          <ImageTileList tileData={tileData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
