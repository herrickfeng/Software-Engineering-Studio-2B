import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";

export default function HomePage() {
  const { authState, setAuthState } = React.useContext(AuthContext);

  if (authState.authenticated) {
    return <TeacherSubjectListPage />;
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