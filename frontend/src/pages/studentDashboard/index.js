import React from "react"
import ClassList from "../../components/classList/index";
import {Container} from "@material-ui/core";

export default function StudentDashboardPage(props) {
  return (
    <Container maxWidth={"md"}>
      <ClassList/>
    </Container>
  );
}