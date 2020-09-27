import React from 'react';

//general material-ui components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    Generate Classes
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">
                    Generate Classes
                </DialogTitle>

                <DialogContent>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" direction="column">
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Lesson Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        <KeyboardTimePicker
                        margin="normal"
                        id="start-time-picker"
                        label="Start Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                        <KeyboardTimePicker
                        margin="normal"
                        id="end-time-picker"
                        label="End Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <InputLabel id="demo-simple-select-label">Repeat</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Daily</MenuItem>
                        <MenuItem value={20}>Weekly</MenuItem>
                        <MenuItem value={30}>Monthly</MenuItem>
                    </Select>
                    
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="occurence"
                        label="Occurence"
                        fullWidth
                        required
                    />
                {/* <Grid 
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
                        /Grid> */} 

                    {/* <TextField
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            id="password"
                            label="Password"
                            fullWidth
                            required
                        /> */}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Generate
                    </Button>
                </DialogActions>

            </Dialog>
        </Container>
    );
}