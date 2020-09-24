import React from 'react';

//general material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

// icon material-ui components
import AddIcon from '@material-ui/icons/Add';

// dialog material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function TeacherAddClassPopup(props) {
  const [state, setState] = React.useState({
    className: "", 
    classCode: "",
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().add(0.5, "hours").format('h:mm'),
    endTime: moment().add(1.5, "hours").format('h:mm')
  });


  const handleChange = (event) => {
    const { id, value } = event.target;
    state[id] = value;
    setState(state);
  }

  const handleAddSubject = () => {
    console.log("state", state)
    props.onAdd(state);
    props.onClose();
  }

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
            id="className"
            label="Class Name"
            fullWidth
            required
            onChange={handleChange}
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="classCode"
            label="Class Code"
            fullWidth
            required
            onChange={handleChange}
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="data"
            type="date"
            label="Date"
            fullWidth
            required
            defaultValue={state.date}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="startTime"
            type="time"
            label="Start Time"
            fullWidth
            required
            defaultValue={state.startTime}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="endTime"
            type="time"
            label="End Time"
            fullWidth
            required
            defaultValue={state.endTime}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubject} color="primary">
            Add Class
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}