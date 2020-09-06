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
import StudentDashboardPage from "./pages/studentDashboard";
import StudentAttendancePage from "./pages/studentAttendance";
import StudentProfilePage from "./pages/studentProfile";
import Navigation from "./components/navigation";
import StudentNavigation from "./components/studentNavigation";
import Footer from "./components/footer";


//Context
import { AuthProvider } from "./context/auth";
import StudentClassListPage from "./pages/studentClassList/index";


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
        <Navigation />
        <HomePage />
      </Route>

      <Route path="/login" exact>
        <Navigation />
        <LoginPage />
      </Route>

      <Route path="/signup" exact>
        <Navigation />
        <SignupPage />
      </Route>

      <Route path="/student/dashboard" exact>
        <StudentNavigation />
        <StudentDashboardPage />
      </Route>

      <Route path="/student/attendance" exact>
        <StudentNavigation />
        <StudentAttendancePage />
      </Route>

      <Route path="/student/profile" exact>
        <StudentNavigation />
        <StudentProfilePage />
      </Route>

      <Route path="/student/classList" exact>
        <StudentNavigation />
        <StudentClassListPage />
      </Route>

      <Route
          path="/teacher/subjectList"
          exact={true}>
          <TeacherSubjectListPage />
      </Route>

      <Route
          path="/teacher/subjectList/classList"
          exact={true}>
          <TeacherClassListPage/>
      </Route>

      <Route
          path="/teacher/subjectList/classList/applicationsView"
          exact={true}>
          <TeacherApplicationsViewPage/>
      </Route>

      <Route path="/upload" exact>
        <UploadPage />
      </Route>

    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          {/* <Navigation /> */}
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