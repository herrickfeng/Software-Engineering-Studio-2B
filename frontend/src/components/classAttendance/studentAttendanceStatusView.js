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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, id, facial, questions, location, signOff, status) {
  return { name, id, facial, questions, location, signOff, status };
}

const rows = [
  createData('Steve', 1, 'Incomplete', 'Complete', 'Complete', 'Incomplete', 'Incomplete'),
  createData('Jimmy', 2, 'Incomplete', 'Complete', 'Complete', 'Incomplete', 'Incomplete'),
  createData('Sarah', 3, 'Incomplete', 'Complete', 'Complete', 'Incomplete', 'Incomplete'),
];

function deleteItem(i) {
    const { items } = this.state;
    items.splice(i, 1);
    this.setState({ items });
}

export default function SimpleTable() {
  const classes = useStyles();


  return (
    <Box display="flex" justifyContent="center" alignItems="center">
        <TableContainer style={{ width: "80%" }} component={Paper}>
            <Table size="small" className={classes.table} aria-label="simple table">
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
                    {rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.facial}</TableCell>
                        <TableCell align="center">{row.questions}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.signOff}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}