import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

//Components

//Pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import appTheme from "./helpers/appTheme";
import UploadPage from "./pages/upload";

import TeacherSubjectListPage from "./pages/teacherSubjectList/index.js";
import TeacherClassListPage from "./pages/teacherClassList/index.js"
import TeacherApplicationsViewPage from "./pages/teacherApplicationsView/index.js"

import TeacherClassAttendanceViewPage from "./pages/teacherClassAttendanceView/index.js"

import StudentDashboardPage from "./pages/studentDashboard";
import StudentAttendancePage from "./pages/studentAttendance";
import Navigation from "./components/navigation";
import Footer from "./components/footer";


//Context
import { AuthProvider } from "./context/auth";
import Signout from "./helpers/auth/signout.js";
import PrivateRoute from "./components/PrivateRoute";


function AppProvider(props) {
  return (
    <ThemeProvider theme={appTheme}>
      <AuthProvider>
        {props.children}
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppRouter(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/login" exact>
        <LoginPage />
      </Route>

      <Route path="/signup" exact>
        <SignupPage />
      </Route>

      <Route path="/signout" exact>
        <Signout />
      </Route>

      <PrivateRoute
        path="/student/dashboard"
        exact={true}
        component={StudentDashboardPage}
      />

      <PrivateRoute
        path="/student/attendance"
        exact={true}
        component={StudentAttendancePage}
      />

      <PrivateRoute
        path="/teacher/subjectList"
        exact={true}
        component={TeacherSubjectListPage}
      />

      <PrivateRoute
        path="/teacher/subjectList/classList"
        exact={true}
        component={TeacherClassListPage}
      />

      <PrivateRoute
        path="/teacher/subjectList/classList/applicationsView"
        exact={true}
        component={TeacherApplicationsViewPage}
      />

      <PrivateRoute
        path="/teacher/subjectList/classList/applicationsView/classAttendanceView"
        exact={true}
        component={TeacherClassAttendanceViewPage}
      />

    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Navigation />
          <div>
            <AppRouter />
            {/* TODO: Fix this so it actually goes to the bottom of the page */}
            {/* <Footer /> */}
          </div>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}


export default App;