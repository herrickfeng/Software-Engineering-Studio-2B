import React from 'react';

//general material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// icon material-ui components
import AddIcon from '@material-ui/icons/Add';

// dialog material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function TeacherAddClassPopup(props) {

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">
          Add a New Class
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="subjectName"
            label="Subject Name"
            fullWidth
            required
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="date"
            label="Date"
            fullWidth
            required
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="startTime"
            label="Start Time"
            fullWidth
            required
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="endTime"
            label="End Time"
            fullWidth
            required
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="subjectCode"
            label="Subject Code"
            fullWidth
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onClose} color="primary">
            Add Class
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}