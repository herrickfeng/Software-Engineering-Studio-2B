import React, { useEffect, useState } from "react"
import { Box, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SubjectList from "../../components/subjectList/index";
import Typography from "@material-ui/core/Typography";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

function JoinClassPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormState(event.target.value);
  };

  const handleJoin = () => {
    handleClose();
    props.joinClass(formState);
    setFormState("");
  }

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={5}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <Typography>
            Join Subject
          </Typography>
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">
          Enter class code
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
            value={formState}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
                  </Button>
          <Button onClick={handleJoin} color="primary">
            Join
                  </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default function StudentDashboardPage(props) {
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);

  const fetchData = async () => {
    const subjects = await api.subject.getAll(authState.user.idToken);
    setState(subjects.data.data);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  const history = useHistory();

  function handleSubjectClick(subject) {
    history.push(`/student/subject/${subject.subjectId}`)
  }

  async function handleJoinSubject(subjectCode) {
    // TODO error handling toast
    try {
      await api.subject.join(authState.user.idToken, subjectCode);
      setState(undefined);
    }
    catch (error) {
    }
  }

  return (
    <Container maxWidth={"md"}>
      <Box textAlign="center" my={5}>
        <Typography variant="h4">Subject List</Typography>
      </Box>

      <JoinClassPopup joinClass={handleJoinSubject} />

      <SubjectList data={state} onSubjectClick={handleSubjectClick} />
    </Container>
  );
}