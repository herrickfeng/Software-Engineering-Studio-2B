import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles }from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from "react"
import api from "../../helpers/api/index"
import { createRef, useEffect, useState } from "react"

const useStyles = makeStyles({
  attending: {
    backgroundColor: '#90FF9A',
    //opacity: '0.3'
    //Yellow: FDFF90
    //Red: FF9790
  },

})

export default function ClassAttendanceList(props) {
  const classes = useStyles();
  const [attendanceList, setAttendanceList] = useState(props.classList)

  useEffect(() => {
    setAttendanceList(props.classList)
  },[props]);
  

  function RenderRows(props) {
    const student = props.student._label.split("/")
    const attendance = (student[2] === 'true')
    if (attendance) {
      return (
        <TableRow className={classes.attending}>
          <TableCell> {student[0]} </TableCell>
          <TableCell> {student[1]} </TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow>
          <TableCell> {student[0]} </TableCell>
          <TableCell> {student[1]} </TableCell>
        </TableRow>
      )
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Id </TableCell>
              <TableCell> Name </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceList.map(student => (
              <RenderRows student={student}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}