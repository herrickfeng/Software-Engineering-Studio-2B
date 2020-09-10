import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";

export default function HomePage() {
  const { authState, setAuthState } = React.useContext(AuthContext);
  console.log(authState.user.uid);

  if (authState.authenticated) {
    return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
  } else {
    return (
      <Container>
        <h1>Welcome to FAST</h1>
        <Button to="/login" component={Link}>
          Login
      </Button>
        <Button to="/signup" component={Link}>
          Sign Up
      </Button>
      </Container>
    )
  }
}