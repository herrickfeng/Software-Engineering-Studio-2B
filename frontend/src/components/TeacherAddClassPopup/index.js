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
import moment from 'moment';
// import MomentUtils from "@date-io/moment";

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

    const nextHour = moment().add(1, "hours").startOf('hour');
    const [formState, setFormState] = React.useState({
        firstDate: moment().format('YYYY-MM-DD'),
        startTime: moment(nextHour).format('HH:mm'),
        endTime: moment(nextHour).add(1, "hours").format('HH:mm'),
        repeat: "Daily",
        occurrence: 1
    });

    const handleChange = (event) => {
        var { id, value } = event.target;
        if (id === undefined && value == "Daily" || value == "Weekly" || value == "Monthly" ) id = "repeat"
        formState[id] = value;
        console.log(id, value, formState)
        setFormState(formState);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        handleClose();
        props.handleGenerate(formState);
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
                    {/* TODO : Use @material-ui/pickers */}
                    {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around" direction="column">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                margin="normal"
                                id="firstDate"
                                label="Lesson Start Date"
                                inputValue={formState.firstDate}
                                onChange={(value) => {
                                    handleChange(value.format('YYYY-MM-DD'), "firstDate")
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="startTime"
                                label="Start Time"
                                value={formState.startTime}
                                onChange={(value) => {
                                    handleChange(value.format('HH:mm'), "startTime")
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="endTime"
                                label="End Time"
                                value={formState.endTime}
                                onChange={(value) => {
                                    handleChange(value.format('HH:mm'), "endTime")
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider> */}
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="firstDate"
                        type="date"
                        label="Date"
                        fullWidth
                        required
                        defaultValue={formState.firstDate}
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
                        defaultValue={formState.startTime}
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
                        defaultValue={formState.endTime}
                        onChange={handleChange}
                    />
                    <InputLabel id="demo-simple-select-label">Repeat</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="repeat"
                        defaultValue={formState.repeat}
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem id="repeat" value={"Daily"}>Daily</MenuItem>
                        <MenuItem id="repeat" value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem id="repeat" value={"Monthly"}>Monthly</MenuItem>
                    </Select>

                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="occurrence"
                        label="Occurrence"
                        fullWidth
                        required
                        type="number"
                        defaultValue={formState.occurrence}
                        onChange={handleChange}
                    />
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