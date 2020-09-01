import React from "react"
import StudentProfile from "../../components/studentProfile/index";
import {Container} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Popup from "../../components/studentProfile/popup";

export default function StudentProfilePage(props) {
  return (
    <Container maxWidth={"md"}>
      <StudentProfile/>
      <Box>
					<Popup />
			</Box>
    </Container>
  );
}