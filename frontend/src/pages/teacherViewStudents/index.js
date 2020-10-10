import React, { useEffect, useState } from "react";
import { Box, Button, Container, TableHead, TableRow, TableCell, TableBody, useTheme, useMediaQuery } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import LinedTable from "../../components/linedTable/index";
import api from "../../helpers/api/index";
import { AuthContext } from "../../context/auth";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  image: {
    height: "auto",
    width: "2.5vw",
  },
}));

export default function TeacherViewStudentsPage(props) {
  const [data, setData] = useState({});
  const { authState } = React.useContext(AuthContext);
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const subjectId = props.match.params.subjectId;
  // TODO relook at approaching this at mobile and do we really need to show images?
  const hideImage = useMediaQuery(theme.breakpoints.down("sm")); //true;

  async function fetchData() {
    let subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    let students = (await api.subject.getStudents(authState.user.idToken, subjectId)).data.data;
    console.log(students);
    setData({subject, students});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    (data.students ?
        <Container maxWidth={"md"}>
          <Box textAlign="center" my={5}>
            <Typography variant="h4">{data.subject.subjectName} - Students</Typography>
          </Box>

          <Box>
            <LinedTable>
              <TableHead>
                <TableRow>
                  {hideImage ? null : (
                    <TableCell />
                  )}
                  <TableCell>
                    Student ID
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.students.map(student => (
                  <TableRow key={student.studentId}>
                    {hideImage ? null : (
                      <TableCell>
                        <img className={classes.image} src={student.image} />
                      </TableCell>
                    )}
                    <TableCell>
                      {student.studentId}
                    </TableCell>
                    <TableCell>
                      {student.displayName}
                    </TableCell>
                    <TableCell>
                      {student.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </LinedTable>

            <Box my={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="primary" component={Link} to={`/teacher/subject/${subjectId}`}>
                Back
              </Button>
            </Box>
          </Box>
        </Container>
        // TODO: Loading spinner icon thingy
        : <h1>Loading</h1>
    )
  );
}