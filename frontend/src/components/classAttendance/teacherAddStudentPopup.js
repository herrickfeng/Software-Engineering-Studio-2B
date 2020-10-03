import React from 'react';
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

//general material-ui components
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";

// icon material-ui components
import AddIcon from '@material-ui/icons/Add';

// dialog material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function TeacherSignUpPopup(props) {
    
    const [open, setOpen] = React.useState(false);
    //const [studentState, setStudentState] = React.useState({});
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleStudentChange = (event) => {
        /*const { id, value } = event.target;
        subjectState[id] = value;
        setSubjectState({ ...subjectState });*/
    }

    const handleAddStudent = () => {
        /*const studentData = {
            studentName: studentState.studentName,
            studentID: studentState.studentID
        }
        props.addSubject(studentData);*/
        handleClose();
    }

    return (
        <Container maxWidth="md">
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}>
                    Add Student
				</Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Add a New Student
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To add a new subject, please enter a valid Student Name and ID down below.
                        </DialogContentText>

                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="studentName"
                        label="Student Name"
                        fullWidth
                        required
                        onChange={handleStudentChange}
                    />

                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="studentID"
                        label="Student ID"
                        required
                        onChange={handleStudentChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddStudent} color="primary">
                        Add Student
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
}