import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from "react"
import { createRef, useEffect, useState } from "react"

export default function ClassAttendanceList(props) {
  let classListData = props.classList

  /*
  useEffect(() => {
    classListData = props.classList;
    setClassListState(classListData)
    console.log("wHOOP")
    console.log(classListData)
  },[props]);
  */

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
            {classListData.map(student => (
              <TableRow>
                <TableCell> {student._label.split("/")[0]} </TableCell>
                <TableCell> {student._label.split("/")[1]} </TableCell>
              </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}