import React from "react"
import ClassList from "../../components/classList/index";
import {Container} from "@material-ui/core";

export default function StudentClassListPage(props) {
  return (
    <Container maxWidth={"md"}>
      <ClassList backTo={"/student/dashboard"} />
    </Container>
  );
}