import React from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Grid, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AuthContext } from "../../context/auth";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const styles = {
	test: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: "10vh",
	},
	submit: {
		display: "flex",
	},
	load: {
		marginLeft: "45%",
		paddingTop: "5vh",
	},
};

/// Deprecated
export class SignUpPage extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			signupError: undefined,
			isLoading: false,
			form: {
				email: "",
				password: "",
				firstName: "",
				lastName: "",
			},
		};

		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.buildLoginError = this.buildLoginError.bind(this);
	}

	handleFormChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			...this.state,
			form: { ...this.state.form, [name]: value },
		});
	}

	handleSubmit = async (event) => {
		// Stop the form element from adding query params by default
		event.preventDefault();

		try {
			this.setState({ ...this.state, isLoading: true });
			// await createUser({
			// 	displayName: `${this.state.form.firstName} ${this.state.form.lastName}`,
			// 	email: this.state.form.email,
			// 	password: this.state.form.password,
			// });

			// const userDetails = await loginUser(
			// 	this.state.form.email,
			// 	this.state.form.password
			// );

			// this.context.setAuthState({
			// 	authenticated: true,
			// 	user: userDetails.user,
			// });
		} catch (error) {
			console.log(error.response);
			
			this.setState({
				...this.state,
				signupError: error.response.data,
			});
		}
		this.setState({ ...this.state, isLoading: false });
	};

	buildLoginError = () => {
		let errorMessage = "An error occurred.";
		const errorCode = this.state.signupError.errorCode;

		console.log(errorCode);

		if (errorCode === "auth/email-already-exists") {
			errorMessage = "The email already exists";
		} else if (errorCode === "auth/invalid-password") {
			errorMessage = "The password must meet requirements (min 6 characters)";
		} else if (errorCode === "auth/email-invalid") {
			errorMessage = "The provided email format is invalid";
		}

		return (
			<>
				<Alert severity="error">{errorMessage}</Alert>
				<br></br>
			</>
		);
	};

	signupForm = () => {
		return (
			<Container Component="main" maxWidth="xs">
				<div className={this.props.classes.test}>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<h1>Sign Up</h1>
					{this.state.signupError !== undefined &&
						!this.state.isLoading &&
						this.buildLoginError()}
					<form onSubmit={this.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								{/* firstName */}
								<TextField
									label="First Name"
									variant="outlined"
									name="firstName"
									required
									Fullwidth
									autoFocus
									onChange={this.handleFormChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* lastName */}
								<TextField
									label="Last Name"
									variant="outlined"
									name="lastName"
									required
									Fullwidth
									onChange={this.handleFormChange}
								/>
							</Grid>
							<Grid item xs={12}>
								{/* email */}
								<TextField
									label="Email"
									variant="outlined"
									name="email"
									required
									fullWidth
									onChange={this.handleFormChange}
								/>
							</Grid>
							<Grid item xs={12}>
								{/* password */}
								<TextField
									label="Password (More than 6 characters)"
									variant="outlined"
									name="password"
									required
									fullWidth
									type="password"
									onChange={this.handleFormChange}
								/>
							</Grid>
							<br />
							<Button
								variant="contained"
								type="submit"
								fullWidth
								disabled={this.state.isLoading}
								classname={this.props.classes.submit}
							>
								Submit
							</Button>
						</Grid>
						<Box className={this.props.classes.load}>
							{this.state.isLoading && <CircularProgress />}
						</Box>
					</form>
				</div>
			</Container>
		);
	};

	 render() {
	// 	if (!this.context.authState.authenticated) {
			return this.signupForm();
		// } else {
		// 	return <Redirect to="/" />;
		// }
	}
 }

export default withStyles(styles)(SignUpPage);
