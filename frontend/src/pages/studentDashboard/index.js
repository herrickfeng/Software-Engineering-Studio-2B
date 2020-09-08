import React, { useEffect, useState } from "react"
import { Box, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SubjectList from "../../components/subjectList/index";
import Typography from "@material-ui/core/Typography";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

export default function StudentDashboardPage(props) {
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);

  const fetchData = async () => {
    const subjects = await api.subject.getAll(authState.user.idToken);
    setState(subjects.data.data);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  const history = useHistory();

  function handleSubjectClick(subject) {
    // TODO pass subject information or do something with it towards the class list
    history.push("/student/classList")
  }

  return (
    <Container maxWidth={"md"}>
      <Box textAlign="center" my={5}>
        <Typography variant="h4">Subject List</Typography>
      </Box>

      <Box textAlign="center" my={5}>
        <Button variant="contained" color="primary">
          <Typography>
            Join Subject
          </Typography>
        </Button>
      </Box>

      <SubjectList data={state} onSubjectClick={handleSubjectClick} />
    </Container>
  );
}