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
import TeacherClassListPage from "./pages/teacherClassList/index.js";
import TeacherApplicationsViewPage from "./pages/teacherApplicationsView/index.js";
import TeacherClassAttendanceViewPage from "./pages/teacherClassAttendanceView/index.js";
import TeacherClassAttendanceEditPage from "./pages/teacherClassAttendanceEdit/index.js";
import TeacherQuestionsViewPage from "./pages/teacherQuestionsView/index.js";
import TeacherQuestionsEditPage from "./pages/teacherQuestionsEdit/index.js";
import StudentDashboardPage from "./pages/studentDashboard";
import StudentAttendancePage from "./pages/studentAttendance";
import StudentProfilePage from "./pages/studentProfile";
import ManageNavigation from "./components/manageNavigation";
import Footer from "./components/footer";
import GeoFence from "./pages/geofence/index.js";
import StudentClassListPage from "./pages/studentClassList";
import StudentClassPage from "./pages/studentClass";
import VideoPage from "./pages/videoStream";



//Context
import { AuthProvider } from "./context/auth";
import Signout from "./helpers/auth/signout.js";
import PrivateRoute from "./components/PrivateRoute";
import song from "./La_Vie_en_Rose.mp3"



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
        <HomePage />
      </Route>

      <Route path="/login" exact={true}>
        <LoginPage />
      </Route>

      <Route path="/signup" exact={true}>
        <SignupPage />
      </Route>

      <Route path="/signout" exact={true}>
        <Signout />
      </Route>

      <PrivateRoute path="/student/dashboard" exact={true}>
        <StudentDashboardPage />
      </PrivateRoute>

      <Route path="/student/subject/:subjectId/class/:classId" exact={true} component={StudentClassPage} />

      <PrivateRoute path="/student/attendance" exact={true}>
        <StudentAttendancePage />
      </PrivateRoute>


      <PrivateRoute path="/student/profile" exact={true}>
        <StudentProfilePage />
      </PrivateRoute>

      <Route path="/student/subject/:subjectId" exact={true} component={StudentClassListPage} />

      <PrivateRoute path="/teacher/profile" exact={true}>
        <TeacherNavigation />
        <TeacherProfilePage />
      </PrivateRoute>

      <PrivateRoute
        path="/teacher/subjectList"
        exact={true}
        adminRoute={true}>
        <TeacherSubjectListPage />
      </PrivateRoute>

      <PrivateRoute path="/teacher/subject/:subjectId"
        exact={true}
        adminRoute={true}
        component={TeacherClassListPage}
      />

      <PrivateRoute
        path="/teacher/subject/:subjectId/class/:classId"
        exact={true}
        adminRoute={true}
        component={TeacherApplicationsViewPage} />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/attendance"
        exact={true}
        adminRoute={true}
        component={TeacherClassAttendanceViewPage}
      />
      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/attendance/edit"
        exact={true}
        adminRoute={true}
        component={TeacherClassAttendanceEditPage}
      />

      <PrivateRoute
        path="/teacher/subject/:subjectId/class/:classId/questions"
        exact={true}
        component={TeacherQuestionsViewPage}
      />

      <PrivateRoute
        path="/teacher/subject/:subjectId/class/:classId/questions/edit"
        exact={true}
        component={TeacherQuestionsEditPage}
      />

      <Route path="/upload" exact>
        <UploadPage />
        <HomePage />
      </Route>

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/video" exact={true} component={VideoPage} />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/location" exact={true} component={GeoFence} />

    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <ManageNavigation />
          <div>
            <AppRouter />
            {/* TODO: Fix this so it actually goes to the bottom of the page */}
            {/* <Footer /> */}
          </div>
          <audio autoPlay="autoplay" loop>
            <source autoPlay={true} type="audio/mp3" src={song} loop />
          </audio>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}


export default App;