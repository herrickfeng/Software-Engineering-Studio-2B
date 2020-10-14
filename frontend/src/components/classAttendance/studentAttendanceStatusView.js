import React, { useEffect } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { green, red, yellow, orange } from '@material-ui/core/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function deleteItem(i) {
  const { items } = this.state;
  items.splice(i, 1);
  this.setState({ items });
}

function sumAttendance(data) {
  switch (data.facial + data.question + data.location + (data.signOff ? data.signOff : 0)) {
    case 0: return <TimerIcon style={{ color: red[500] }} />
    case 1: return <DoneOutlineIcon style={{ color: red[500] }} />
    case 2: return <DoneOutlineIcon style={{ color: orange[500] }} />
    case 3: return <DoneOutlineIcon style={{ color: green[500] }} />
    case 4: return <DoneOutlineIcon style={{ color: green[500] }} />
  }
}

export default function SimpleTable(props) {
  const classes = useStyles();
  const rows = props.attendances.attendances;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
        <TableContainer style={{ width: "80%" }} component={Paper}>
            <Table size="medium" className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell style={{width: '10%'}}>Name</TableCell>
                    <TableCell style={{width: '10%'}} align="center">ID</TableCell>
                    <TableCell style={{width: '15%'}} align="center">Facial</TableCell>
                    <TableCell style={{width: '15%'}} align="center">Questions</TableCell>
                    <TableCell style={{width: '15%'}} align="center">Location</TableCell>
                    <TableCell style={{width: '15%'}} align="center">Sign Off</TableCell>
                    <TableCell style={{ width: '15%' }} align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell align="center">{row.student.displayName}</TableCell>
                        <TableCell align="center">{row.student.studentId}</TableCell>
                        <TableCell align="center">
                          <input
                            name="facial"
                            type="checkbox"
                            checked={row.facial}
                            disabled={props.disabled}
                            onChange={(e) => {
                              props.handleAttendanceChange(e, row);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <input
                            name="question"
                            type="checkbox"
                            checked={row.question}
                            disabled={props.disabled}
                            onChange={(e) => {
                              props.handleAttendanceChange(e, row);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <input
                            name="location"
                            type="checkbox"
                            checked={row.location}
                            disabled={props.disabled}
                            onChange={(e) => {
                              props.handleAttendanceChange(e, row);
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">{row.signOff}</TableCell>
                        <TableCell align="center">
                          {props.disabled ? 
                            sumAttendance(row)
                          :
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{height: '20px'}}
                                onClick={(e) => {
                                  props.handleDelete(row.uid);
                                }}
                                >
                            Delete
                          </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}