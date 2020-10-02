import React from "react"
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import TimerIcon from '@material-ui/icons/Timer';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


export default function ClassAttendanceList(props) {

  function studentItem(student) {
    const [uid, name, attendanceString] = student._label.split("/");
    const hasAttendance = (attendanceString === 'true');

    return (
      <>
        <ListItem>
          <ListItemText primary={name} />
          <ListItemIcon>{hasAttendance ? <DoneOutlineIcon /> : <TimerIcon />}</ListItemIcon>
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