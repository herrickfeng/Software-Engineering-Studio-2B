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
import TeacherSubjectListPage from "./pages/teacherDashboard/teacherSubjectList";
import StudentDashboardPage from "./pages/studentDashboard";
import StudentAttendancePage from "./pages/studentAttendance";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import ClassList from "./pages/classList/index.js"

//Context
import { AuthProvider } from "./context/auth";


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

        <Route
          path="/teacherDashboard/teacherSubjectList"
          exact={true}>
          <TeacherSubjectListPage />
        </Route>

      <Route path="/student/dashboard" exact>
        <StudentDashboardPage />
      </Route>

      <Route path="/student/attendance" exact>
        <StudentAttendancePage />
      </Route>

      <Route path="/teacherDashboard/teacherSubjectList" exact>
        <TeacherSubjectListPage />
      </Route>
        <Route
          path="/teacherDashBoard/teacherSubjectList/classList"
          exact={true}>
          <ClassList/>
        </Route>

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