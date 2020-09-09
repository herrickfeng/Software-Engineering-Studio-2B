import React from "react"
import ClassList from "../../components/classList/index";
import { Box, Button, Container } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function StudentClassListPage(props) {
  const history = useHistory();

  function onRowClick(event, entry) {
    // TODO pass data into the next page about the particular class
    history.push("/student/class");
  }

  return (
    <Container maxWidth={"md"}>
      <Box mt={5} mb={2}>
        {/* TODO Retrieve data from history and display the current subject name */}
        <Typography variant="h4">Software Engineering Studio 2B</Typography>
      </Box>

      <ClassList backTo="/student/dashboard" onRowClick={onRowClick} />

      <Box my={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary" component={Link} to="/student/dashboard">
          Back
        </Button>
      </Box>
    </Container>
  );
}