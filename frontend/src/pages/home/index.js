import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import steps from "../../helpers/tour/steps.js"

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
};


function Button2() {
  const tour2 = React.useContext(ShepherdTourContext);

  return (
    <button onClick={tour2.start}>
      Help
    </button>
  );
}

export default function HomePage() {
  const { authState, setAuthState } = React.useContext(AuthContext);

  if (authState.authenticated) {
    return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" /> : <Redirect to="/student/dashboard" />;
  } else {
    return (
      <Container>
        <h1>Welcome to FAST</h1>
        <Button to="/login" component={Link}>
          Login
      </Button>
        <ShepherdTour steps={steps} tourOptions={tourOptions}>
          <Button to="/signup" component={Link}>
            Sign Up
          </Button>
        </ShepherdTour>
        <Button2 />
      </Container>
    )
  }
}