/**import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	signup: {
		marginRight: theme.spacing(3),
	},
	title: {
		color: "white",
		textDecoration: "none",
	},
	navcolor: {
		background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
		color: "white",
		padding: "0 30px",
	},
}));

const buildStudentNav = (classes, signOutFunc) => {
	return (
		<AppBar className={classes.navcolor} position="static">
			<Toolbar>
				<Box flexGrow={1}>
					<Typography
						variant="h5"
						className={classes.title}
						component={Link}
						to="/"
					>
						Quantum Circuit Simulator Group 2 - Student
					</Typography>
				</Box>

				<Button
					className={classes.signup}
					color="inherit"
					component={Link}
					to="/student/tasks"
					size="small"
				>
					Tasks List
				</Button>
				<Button
					className={classes.signup}
					color="inherit"
					component={Link}
					to="/profile"
					size="small"
				>
					Profile
				</Button>
				<Button
					color="inherit"
					onClick={signOutFunc}
					component={Link}
					to="/"
					size="small"
					variant="outlined"
				>
					Sign out
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const buildTeacherNav = (classes, signOutFunc, superuser) => {
	return (
		<AppBar className={classes.navcolor} position="static">
			<Toolbar>
				<Box flexGrow={1}>
					<Typography
						variant="h5"
						className={classes.title}
						component={Link}
						to="/"
					>
						Quantum Circuit Simulator Group 2 -{" "}
						{superuser ? "Admin" : "Teacher"}
					</Typography>
				</Box>
				{superuser && (
					<Button
						className={classes.signup}
						color="inherit"
						component={Link}
						to="/admin"
						size="small"
					>
						Admin Dashboard
					</Button>
				)}
				<Button
					className={classes.signup}
					color="inherit"
					component={Link}
					to="/profile"
					size="small"
				>
					Profile
				</Button>
				<Button
					className={classes.signup}
					color="inherit"
					component={Link}
					to="/admin/tasks"
					size="small"
				>
					Tasks List
				</Button>
				<Button
					color="inherit"
					component={Link}
					to="/"
					onClick={signOutFunc}
					size="small"
					variant="outlined"
				>
					Sign Out
				</Button>
			</Toolbar>
		</AppBar>
	);
};

function Navigation() {
	const classes = useStyles();
	const { authState, setAuthState } = React.useContext(AuthContext);
	let navComp;

	const handleSignOut = () => {
		setAuthState(null);
	};

	if (authState.authenticated) {
		if (
			authState.user.claims !== undefined &&
			(authState.user.claims.superuser || authState.user.claims.teacher)
		) {
			navComp = buildTeacherNav(
				classes,
				handleSignOut,
				authState.user.claims.superuser
			);
		} else {
			// If the authenticated user does not have a teacher
			// claim assume its a assume they are a student user
			navComp = buildStudentNav(classes, handleSignOut);
		}
	}

	return <div className="App container">{navComp}</div>;
}

export default Navigation;**/