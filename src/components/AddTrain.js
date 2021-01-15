import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTrain(props){
const [open, setOpen] = React.useState(false);
const [training, setTraining] = React.useState({
    date: '', duration: '', activity: '',  customer: props.customer
})
const handleClickOpen = () => {
    setOpen(true);
  };

const handleClose = () => {
    setOpen(false);
  }

const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
}
const addTrain = () => {
  props.saveTrain(training);
  handleClose();
}
    return(
        <div>
            <Button style={{margin: 10}}variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a new training session
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add workout details</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            type="datetime-local"
            label="Date"
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTrain} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
    }

