import React, { useEffect, useState } from "react";
import { Box, Button, Container, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import LinedTable from "../../components/linedTable/index";
import api from "../../helpers/api/index";
import { AuthContext } from "../../context/auth";
import LoadingStatus from "../../components/loadingStatus/index";


export default function TeacherViewStudentsPage(props) {
  const [data, setData] = useState({});
  const { authState } = React.useContext(AuthContext);
  const history = useHistory();
  const subjectId = props.match.params.subjectId;

  async function fetchData() {
    let subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    let students = (await api.subject.getStudents(authState.user.idToken, subjectId)).data.data;
    setData({subject, students});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LoadingStatus />
  );

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
                  <>
                    <TableCell>
                      {student.studentId}
                    </TableCell>
                    <TableCell>
                      {student.displayName}
                    </TableCell>
                    <TableCell>
                      {student.email}
                    </TableCell>
                  </>
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
        : <LoadingStatus />
    )
  );
}