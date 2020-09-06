import React from "react";
import { AuthContext } from "../../context/auth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	adminRoute = false,
	...routeProps
}) => {
	const { authState } = React.useContext(AuthContext);

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

	return (
		<Route
			render={(props) =>
				isAuthenticated() ? props.children : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
