import React from 'react';

//general material-ui components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// icon material-ui components
import EditIcon from '@material-ui/icons/Edit';
import UploadImageForm from "../../components/upload"; 

// dialog material-ui components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';



export default function TeacherSignUpPopup(props) {
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = React.useState(props.profileState);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        formState[event.target.id] = event.target.value;
        setFormState({...formState});
    };

    const handleSave = () => {
        handleClose();
        props.updateProfile({...formState});
        setFormState({...formState});
    }

    return (
        <Container maxWidth="md" alignItems="center" justifyContent="center">
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<EditIcon />} >
                    Edit
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    Edit Profile
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="displayName"
                        label="Name"
                        fullWidth
                        required
                        onChange={handleChange}
                        defaultValue={formState.displayName}
                    />
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="email"
                        label="Email Address"
                        fullWidth
                        required
                        onChange={handleChange}
                        defaultValue={formState.email}
                    />
                    <Grid 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                        <Typography variant="subtitle1" gutterBottom>
                            Password
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            margin="normal"
                            
                            onClick={props.handleResetPassword}
                            >Email Reset Link
                        </Button>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
}