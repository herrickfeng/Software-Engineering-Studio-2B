import React, {useEffect, useState} from "react"
import ClassList from "../../components/classList/index";
import { Box, Button, Container } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";

export default function StudentClassListPage(props) {
  const subjectId = props.match.params.subjectId;
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);
  const history = useHistory();

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    subject.classes = (await api.subject.class.getAll(authState.user.idToken, subjectId)).data.data;
    setState(subject);
    console.log(subject);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  function onRowClick(event, entry) {
    history.push(`/student/subject/${subjectId}/class/${entry.classId}`);
  }

  return (
    (state ? 
    <Container maxWidth={"md"}>
      <Box mt={5} mb={2}>
        <Typography variant="h4">{`${state.subjectCode} ${state.subjectName}`}</Typography>
      </Box>

      <ClassList backTo="/student/dashboard" onRowClick={onRowClick} data={state.classes} />

      <Box my={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary" component={Link} to="/student/dashboard">
          Back
        </Button>
      </Box>
    </Container> 
    // TODO: Loading spinner icon thingy
    : <h1>Loading</h1>
    )
  );
}