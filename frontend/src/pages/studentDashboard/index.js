import React, { useEffect, useState } from "react"
import { Box, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SubjectList from "../../components/subjectList/index";
import Typography from "@material-ui/core/Typography";
import CodePopup from "../../components/codePopup/index";
import api from "../../helpers/api"
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

  const [openCodePopup, setOpenCodePopup] = useState(false);
  const history = useHistory();

  function handleSubjectClick(subject) {
    history.push(`/student/subject/${subject.subjectId}`)
  }

  async function handleJoinSubject(subjectCode) {
    // TODO error handling toast
    try {
      await api.subject.join(authState.user.idToken, subjectCode);
      setState(undefined);
    }
    catch (error) {
    }
  }

  return (
    <Container maxWidth={"md"}>
      <Box textAlign="center" my={5}>
        <Typography variant="h4">Subject List</Typography>
      </Box>

      <Box textAlign="center" my={5}>
        <Button variant="contained" color="primary" onClick={() => setOpenCodePopup(true)}>
          <Typography>
            Add Subject
          </Typography>
        </Button>
        <CodePopup title="Enter Subject Code" open={openCodePopup} onClose={() => setOpenCodePopup(false)}/>
      </Box>

      <SubjectList data={state} onSubjectClick={handleSubjectClick} />
    </Container>
  );
}