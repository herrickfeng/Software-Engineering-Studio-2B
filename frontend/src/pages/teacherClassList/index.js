import React from "react";

// project components
import TeacherAddClassPopup from "../../components/classList/TeacherAddClassPopup.js";

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box, Container } from "@material-ui/core";
import ClassList from "../../components/classList/index";


export default function TeacherClassListPage(props) {
  const [openAddPopup, setOpenAddPopup] = React.useState(false);

  return (
    <Container maxWidth={"md"}>
      <Box textAlign="center" my={5}>
        <Typography variant="h4">SES2A Class List</Typography>
      </Box>

      <Box>
        <TeacherAddClassPopup />
      </Box>

      <Box>
        <ClassList onAddClick={() => setOpenAddPopup(true)} backTo={"/teacher/subjectList"}/>
      </Box>

      <TeacherAddClassPopup open={openAddPopup} onClose={() => setOpenAddPopup(false)}/>
    </Container>
  );
}