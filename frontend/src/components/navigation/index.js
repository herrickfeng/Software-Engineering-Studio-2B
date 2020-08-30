import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import { AuthContext } from "../../context/auth";

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

const buildGuestNav = (classes) => {
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
						FAST V1.0
					</Typography>
				</Box>
				<Button
					className={classes.signup}
					color="inherit"
					component={Link}
					to="/signup"
					size="small"
				>
					Sign Up
				</Button>
				<Button
					color="inherit"
					component={Link}
					to="/login"
					size="small"
					variant="outlined"
				>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};
//Work in progress, allows students and teachers navbar once Authstate is implemented.
function Navigation() {
		const classes = useStyles();
		let navComp;
		navComp = buildGuestNav(classes);
		return <div className="App container">{navComp}</div>;
}

export default Navigation;
