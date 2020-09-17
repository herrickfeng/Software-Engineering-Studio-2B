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
import StudentProfilePage from "./pages/studentProfile";
import Navigation from "./components/navigation";
import StudentNavigation from "./components/studentNavigation";
import TeacherNavigation from "./components/teacherNavigation";
import Footer from "./components/footer";
import StudentClassListPage from "./pages/studentClassList";
import StudentClassPage from "./pages/studentClass";
import VideoPage from "./pages/videoStream";


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
      <Route path="/" exact={true}>
        <Navigation />
        <HomePage />
      </Route>

      <Route path="/login" exact={true}>
        <Navigation />
        <LoginPage />
      </Route>

      <Route path="/signup" exact={true}>
        <Navigation />
        <SignupPage />
      </Route>

      <Route path="/signout" exact={true}>
        <Navigation />
        <Signout />
      </Route>

      <Route path="/video" exact={true}>
        <Navigation />
        <VideoPage />
      </Route>

      <PrivateRoute path="/student/dashboard" exact={true}>
        <StudentNavigation />
        <StudentDashboardPage />
      </PrivateRoute>

      {/* TODO Fix route auth. It is fucked yet again */}
      <Route path="/student/subject/:subjectId/class/:classId" exact={true} component={StudentClassPage} />
      {/* <PrivateRoute path="/student/class" exact={true}>
        <StudentClassPage />
      </PrivateRoute> */}

      <PrivateRoute path="/student/attendance" exact={true}>
        <StudentNavigation />
        <StudentAttendancePage />
      </PrivateRoute>

      <PrivateRoute path="/student/profile" exact={true}>
        <StudentNavigation />
        <StudentProfilePage />
      </PrivateRoute>

      {/* TODO Fix route auth. It is fucked yet again */}
      <Route path="/student/subject/:subjectId" exact={true} component={StudentClassListPage} />
      {/* <Route path="/student/subject/:subjectId" exact={true}
        render={(props)=>{<StudentClassListPage props />}}
      />
        <StudentNavigation />
        <StudentClassListPage />
      </Route> */}

      <PrivateRoute
        path="/teacher/subjectList"
        exact={true}
        adminRoute={true}>
        <TeacherNavigation />
        <TeacherSubjectListPage />
      </PrivateRoute>

      <Route path="/teacher/subject/:subjectId" exact={true} component={TeacherClassListPage} />
      {/* <PrivateRoute
        path="/teacher/subjectList/classList"
        exact={true}
        adminRoute={true}>
        <TeacherNavigation />
        <TeacherClassListPage />
      </PrivateRoute> */}

      <Route path="/teacher/subject/:subjectId/class/:classId" exact={true} component={TeacherApplicationsViewPage} />
      {/* <PrivateRoute
        path="/teacher/subjectList/classList/applicationsView"
        exact={true}
        adminRoute={true}>
        <TeacherNavigation />
        <TeacherApplicationsViewPage />
      </PrivateRoute> */}

      <Route path="/upload" exact>
        <TeacherNavigation />
        <UploadPage />
        <HomePage />
      </Route>

      <Route path="/teacher/subject/:subjectId/class/:classId/video" exact={true} component={VideoPage} />

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