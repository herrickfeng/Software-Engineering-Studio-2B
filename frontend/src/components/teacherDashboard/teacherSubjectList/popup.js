import React from 'react';
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

//general material-ui components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// icon material-ui components
import AddIcon from '@material-ui/icons/Add';

// dialog material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function TeacherSignUpPopup() {
    const [open, setOpen] = React.useState(false);
    const [subjectState, setSubjectState] = React.useState({});
	const { authState } = React.useContext(AuthContext);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubjectChange = (event) => {
        const { id, value } = event.target;
        subjectState[id] = value;
        setSubjectState({ ...subjectState });
    }

    const handleAddSubject = () => {
        const subjectData = {
            subjectName: subjectState.subjectName,
            subjectCode: subjectState.subjectCode
        }
        api.admin.subject.create(authState.user.idToken, subjectData);
        handleClose();
    }

    return (
        <Container maxWidth="md">
            <Box style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
                <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon/>} >
                    Add Subject
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Add a New Subject
                </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            To add a new subject, please enter a valid subject name and code down below.
                        </DialogContentText>

                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            id="subjectName"
                            label="Subject Name"
                            fullWidth
                            required
                            onChange={handleSubjectChange}
                        />

                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            id="subjectCode"
                            label="Subject Code"
                            required
                            onChange={handleSubjectChange}
                        />
                    </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSubject} color="primary">
                        Add Subject
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
}