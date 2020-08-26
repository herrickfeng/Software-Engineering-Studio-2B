import React from 'react';

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

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };


    return (
        <Container maxWidth="md">
            <Box style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
                <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon/>} >
                    Add Class
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add Class
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
}