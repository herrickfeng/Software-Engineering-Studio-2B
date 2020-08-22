import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

//Components

//Pages
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import appTheme from "./helpers/appTheme";
import TeacherSubjectListPage from "./pages/teacherDashboard/teacherSubjectList";

//Context
import { AuthProvider } from "./context/auth";


function AppProvider(props) {
  return (
    <ThemeProvider theme={appTheme}>
      {/* <AuthProvider> */}
      {props.children}
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

function AppRouter(props) {
  return (
    <Switch>
      <Route path="/login" exact={true}>
        <LoginPage />
      </Route>

      <Route path="/signup" exact={true}>
        <SignupPage />
      </Route>

      <Route path="/teacherDashboard/teacherSubjectList" exact={true}>
        <TeacherSubjectListPage />
      </Route>

    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
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