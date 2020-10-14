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
import TeacherProfilePage from "./pages/teacherProfile/index.js";
import StudentQuestion from "./pages/studentQuestion/index.js"
import TeacherNavigation from "./components/teacherNavigation";
import StudentDashboardPage from "./pages/studentDashboard";
import StudentAttendancePage from "./pages/studentAttendance";
import StudentProfilePage from "./pages/studentProfile";
import StudentLocationPage from "./pages/studentLocation";
import ManageNavigation from "./components/manageNavigation";
import Footer from "./components/footer";
import GeoFence from "./pages/geofence/index.js";
import StudentClassListPage from "./pages/studentClassList";
import StudentClassPage from "./pages/studentClass";
import VideoPage from "./pages/videoStream";
import TeacherViewStudentsPage from "./pages/teacherViewStudents/index";



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

      <PrivateRoute path="/student/dashboard" 
        exact={true}
        component={StudentDashboardPage}
      />

      <PrivateRoute path="/student/attendance" 
        exact={true}
        component={StudentAttendancePage} 
      />

      <PrivateRoute 
        path="/student/profile" 
        exact={true}
        component={StudentProfilePage}
      />

      <PrivateRoute path="/student/subject/:subjectId/class/:classId/question"
        exact={true}
        component={StudentQuestion}
    
      <PrivateRoute 
        path="/student/subject/:subjectId"
        exact={true}
        component={StudentClassListPage}
      />

      <PrivateRoute path="/student/subject/:subjectId/class/:classId"
       exact={true} 
       component={StudentClassPage} 
      />

      <PrivateRoute path="/student/subject/:subjectId/class/:classId/location"
       exact={true} 
       component={StudentLocationPage} 
      />
    
      <PrivateRoute path="/teacher/profile" 
        exact={true}
        adminRoute={true}
        component={TeacherProfilePage}
      />

      <PrivateRoute path="/teacher/subjectList"
        exact={true}
        adminRoute={true}
        component={TeacherSubjectListPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId"
        exact={true}
        adminRoute={true}
        component={TeacherClassListPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId/students"
        exact={true}
        adminRoute={true}
        component={TeacherViewStudentsPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId"
        exact={true}
        adminRoute={true}
        component={TeacherApplicationsViewPage}
      />

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

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/questions"
        exact={true}
        adminRoute={true}
        component={TeacherQuestionsViewPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/questions/edit"
        exact={true}
        adminRoute={true}
        component={TeacherQuestionsEditPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/video" 
        exact={true}
        adminRoute={true}
        component={VideoPage}
      />

      <PrivateRoute path="/teacher/subject/:subjectId/class/:classId/location"
        exact={true}
        adminRoute={true}
        component={GeoFence}
      />

      <Route path="/upload" exact>
        <UploadPage />
        <HomePage />
      </Route>

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
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}


export default App;