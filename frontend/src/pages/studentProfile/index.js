import React from "react";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import {Container, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default function StudentProfilePage(props) {
    return (
      <Container maxWidth={"md"} >
         <LinedTable>
        <TableBody>
          <TableRow>
            <TableCell>Name:</TableCell>
            <TableCell>Peter Pan</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell>Student ID:</TableCell>
            <TableCell>12345678</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell>Email Address:</TableCell>
            <TableCell>12345678@uts.edu.au</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell>Password:</TableCell>
            <TableCell>*********</TableCell>
          </TableRow>
        </TableBody>
      </LinedTable>
      <Button variant='outlined'>
          Edit
      </Button>
      </Container>
    );
  }