import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

//Components

//Pages
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import appTheme from "./helpers/appTheme";

//Context

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
			<Route path="/signup" exact={true}>
				<SignupPage />
			</Route>
			<Route path="/login" exact={true}>
				<LoginPage />
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
