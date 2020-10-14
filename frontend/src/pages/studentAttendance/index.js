import React, { useEffect, useState } from "react"
import { Container, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";
import moment from "moment"
import FormatDate from "../../components/date"

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
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);

  const fetchData = async () => {
    const attendances = (await api.user.attend(authState.user.idToken, authState.user.uid)).data.data;
    setState(attendances);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  return (
    <Container maxWidth={"md"}>
      <LinedTable>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Attendance Mark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {state && state.map((attendance) => (
            < TableRow >
              <TableCell>{attendance.subject.subjectName}</TableCell>
              <TableCell>{attendance.class.className}</TableCell>
              <TableCell><FormatDate date={attendance.class.date} /></TableCell>
              <TableCell>{moment(attendance.class.startTime, "hh:mm").format('LT')} - {moment(attendance.class.endTime, "hh:mm").format('LT')}</TableCell>
              <TableCell>
                {moment(attendance.class.date).isBefore(moment(), 'day') &&
                  <Typography className={classes.pass}>
                    {(attendance.facial + attendance.location + attendance.question) / 0.03}
                  </Typography>
                }
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </LinedTable>
    </Container >
  );
}