import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Route, Redirect, useHistory } from "react-router-dom";
import { verify } from "../../helpers/auth/index";
import ProblemRecovery from "../../pages/problemRecovery/index";
import LoadingSpinner from "../loadingSpinner/index";

const PrivateRoute = ({
	component: Component,
	adminRoute = false,
	...routeProps
}) => {
	const history = useHistory();
	const { authState, setAuthState } = React.useContext(AuthContext);
	const [validatedToken, setValidatedToken] = useState(false);
	const [tokenValid, setTokenValid] = useState(false);

	const isAuthenticated = () => {
		if (adminRoute) {
			return (
				authState.authenticated &&
				(authState.user.claims.admin || authState.user.claims.teacher)
			);
		} else {
			return authState.authenticated;
		}
	};

	async function validateToken() {
		setTokenValid(await verify(authState.user.idToken));
		setValidatedToken(true);
	}

	useEffect(() => {
		validateToken();
	}, []);

	function relogin() {
		setAuthState(null);
		history.push("/login");
	}

	return (
		<>
			{validatedToken ? (
				tokenValid ? (
						<Route
							{...routeProps}
							render={(props) =>
								isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
							}
						/>
					) : (
						<ProblemRecovery title="Authentication Invalid" description="Your login may has expired. You may need to login again!"
														 onAcceptClick={relogin} acceptText="Back to Login"/>
					)
			) : <LoadingSpinner /> }
		</>
	);
};

export default PrivateRoute;
