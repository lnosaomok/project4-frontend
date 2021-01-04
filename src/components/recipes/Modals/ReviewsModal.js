import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RecipeReviews from "./RecipeReviews";
import { withStyles } from "@material-ui/core/styles";

export default function NutritionModal({ open, handleClose, allReviews }) {
  let extracted = allReviews[Object.keys(allReviews)[0]];
  const reviewObj = extracted.filter((obj) => {
    return obj.value.charAt(0) === "$";
  });
  return (
    <div>
      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className='nutrition-header'>
            <div>
              {" "}
              <h4 className='special-font'>Reviews</h4>
            </div>
            <DialogActions>
              <Button color='primary' onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </div>

          <div>
            <div id=''>
              {allReviews && allReviews.length > 0 && (
                <RecipeReviews allReviews={reviewObj} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
