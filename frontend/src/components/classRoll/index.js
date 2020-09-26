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
  const [attendanceList, setAttendanceList] = useState(undefined)
  let attendanceData;

  async function getAttendance() {

    /*
    setInterval(async () => {
      attendanceData = await api.subject.attend.getByCl(props.idToken, props.subjectId, props.classId)
      attendanceData = attendanceData.data.data
      Promise.all(
        attendanceData.map(async student => {
          const name = await api.user.getById(props.idToken, student.uid)
          student.displayName = name.data.data.displayName
          return student
        })
      ).then((students) => {
        setAttendanceList(students)
      })
    }, 2000)

    */

    /*
    attendanceData = await api.subject.attend.getByCl(props.idToken, props.subjectId, props.classId)
    attendanceData = attendanceData.data.data
    Promise.all(
      attendanceData.map(async student => {
        const name = await api.user.getById(props.idToken, student.uid)
        student.displayName = name.data.data.displayName
        return student
      })
    ).then((students) => {
      setAttendanceList(students)
    })*/

  }


  /*
  useEffect(() => {
    classListData = props.classList;
    setClassListState(classListData)
    console.log("wHOOP")
    console.log(classListData)
  },[props]);
  */

  function RenderRows(props) {
    const facial = props.student.facial
    if (facial) {
      return (
        <TableRow className={classes.attending}>
          <TableCell> {props.student.uid} </TableCell>
          <TableCell> {props.student.displayName} </TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow>
          <TableCell> {props.student.uid} </TableCell>
          <TableCell> {props.student.displayName} </TableCell>
        </TableRow>
      )
    }
  }

  if (!attendanceList) {
    getAttendance()
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
            </TableBody>
          </Table>
        </TableContainer>
      </div >
    );
  } else {
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
}