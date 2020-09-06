import React from "react";

// project components
import TeacherAddClassPopup from "../../components/classList/TeacherAddClassPopup.js";

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container } from "@material-ui/core";
import ClassList from "../../components/classList/index";
import { Link } from "react-router-dom";


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
        <ClassList />

        <Box my={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" component={Link} to="/teacher/subjectList">
            Back
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setOpenAddPopup(true)}>
            + Add Class
          </Button>
        </Box>
      </Box>

      <TeacherAddClassPopup open={openAddPopup} onClose={() => setOpenAddPopup(false)}/>
    </Container>
  );
}