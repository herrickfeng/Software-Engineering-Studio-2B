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
  let classListData = [props.classListState]
  console.log("I SAW YTOU")
  console.log(props.classList)
  console.log(props)

  useEffect(() => {
    classListData = props.classListState;
    console.log("wHOOP")
    console.log(props.classListState)
  },[props]);

  return (
    <div>
      <h1>  This the class attendance list </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Id </TableCell>
              <TableCell> Name </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> Bitch </TableCell>
              <TableCell> Lasagna </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}