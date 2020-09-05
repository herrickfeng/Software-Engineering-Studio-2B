import React, { useState } from "react"
import { Box, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SubjectList from "../../components/subjectList/index";
import Typography from "@material-ui/core/Typography";
import CodePopup from "../../components/codePopup/index";

export default function StudentDashboardPage(props) {

  let sampleData = [
    {
      code: 31263,
      name: "Introduction to Game Design"
    },
    {
      code: 31251,
      name: "Data Structures and Algorithms"
    },
    {
      code: 41039,
      name: "Programming 1"
    }
  ];

  const [openCodePopup, setOpenCodePopup] = useState(false);
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
        <Button variant="contained" color="primary" onClick={() => setOpenCodePopup(true)}>
          <Typography>
            Add Subject
          </Typography>
        </Button>
        <CodePopup title="Enter Subject Code" open={openCodePopup} onClose={() => setOpenCodePopup(false)}/>
      </Box>

      <SubjectList data={sampleData} onSubjectClick={handleSubjectClick}/>
    </Container>
  );
}