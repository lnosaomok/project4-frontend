import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NutritionTable from "../NutritionTable";
import Chip from "@material-ui/core/Chip";

export default function NutritionModal({
  open,
  handleClose,
  allNutrients,
  healthLabels,
}) {
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
