import React from "react"
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Box } from "@material-ui/core";
import TimerIcon from '@material-ui/icons/Timer';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  listItemContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));


export default function ClassAttendanceList(props) {
  const classes = useStyles();

  function studentItem(student) {
    const [uid, name, attendanceString] = student._label.split("/");
    const hasAttendance = (attendanceString === 'true');

    return (
      <>
        <ListItem>
          <Box className={classes.listItemContent}>
            <ListItemText primary={name} />
            {hasAttendance ? <DoneOutlineIcon /> : <TimerIcon />}
          </Box>
        </ListItem>
        <Divider />
      </>
    );
  }

  return (
    <List>
      <ListSubheader>
        Student Attendance
      </ListSubheader>
      <Divider />
      {props.attendanceList.map(student => studentItem(student))}
    </List>
  );
}