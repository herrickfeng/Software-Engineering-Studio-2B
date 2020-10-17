import React, {useState, useEffect} from "react";

// project components
import TeacherAddClassPopup from "../../components/classList/TeacherAddClassPopup.js";
import GenerateClass from "../../components/TeacherAddClassPopup/index.js"


// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container } from "@material-ui/core";
import ClassList from "../../components/classList/index";
import { Link, useHistory } from "react-router-dom";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";
import LoadingStatus from "../../components/loadingStatus/index";


export default function TeacherClassListPage(props) {
  const subjectId = props.match.params.subjectId;
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
  const history = useHistory();

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    subject.classes = (await api.subject.class.getAll(authState.user.idToken, subjectId)).data.data;
    setState(subject);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  function onRowClick(event, entry) {
    history.push(`/teacher/subject/${subjectId}/class/${entry.classId}`);
  }

	const addClass = async (classData) => {
		const { idToken } = authState.user;
    const subjectClass = (await api.admin.subject.class.create(idToken, subjectId, classData)).data.data.data;
		setState(undefined);
	}

  const handleGenerate = async (data) => {
    // TODO: Error toast
    data.occurrence = parseInt(data.occurrence);
		const { idToken } = authState.user;
    await api.admin.subject.class.generate(authState.user.idToken, subjectId, data);
		setState(undefined);
  }

  return (
    (state ? 
    <Container maxWidth={"md"}>
      <Box textAlign="center" my={5}>
        <Typography variant="h4">{state.subjectName} - Class List</Typography>
      </Box>

      <Box>
        <TeacherAddClassPopup />
      </Box>

      <Box my={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" component={Link} to={`/teacher/subject/${subjectId}/students`}>
          View Students
        </Button>
      </Box>

      <Box>
         <GenerateClass handleGenerate={handleGenerate} />
      </Box>

      <Box>
        <ClassList backTo="/student/dashboard" onRowClick={onRowClick} data={state.classes}/>

        <Box my={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" component={Link} to="/teacher/subjectList">
            Back
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setOpenAddPopup(true)}>
            + Add Class
          </Button>
        </Box>
      </Box>

      <TeacherAddClassPopup open={openAddPopup} onClose={() => setOpenAddPopup(false)} onAdd={addClass}/>
    </Container>
    :
    <LoadingStatus />
    )
  );
}