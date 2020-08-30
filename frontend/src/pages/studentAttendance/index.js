import React from "react"
import {Container, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pass: {
    color: "green",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  fail: {
    color: "fail",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

export default function StudentAttendancePage(props) {
  const classes = useStyles();

  return (
    <Container maxWidth={"md"}>
      <LinedTable>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Attendance Mark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {new Array(10).fill(
            <TableRow>
              <TableCell>Software Engineering Studio 2B</TableCell>
              <TableCell>2020/10/11</TableCell>
              <TableCell>16:00</TableCell>
              <TableCell>
                <Typography className={classes.pass}>
                  pass
                </Typography>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </LinedTable>
    </Container>
  );
}