import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditTrain(props){
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date:'', duration: '', activity: ''
    }
    )
    const handleClickOpen = () => {
        setTraining({date: props.training.date, duration: props.training.duration, activity: props.training.activity})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const updateTrain = () => {
        props.updateTrain(training, props.training.links[0].href);
        handleClose();
    }

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            type="datetime-local"
            onChange={e => handleInputChange(e)}
            label="Date and time"
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
            label="Color"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTrain} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
