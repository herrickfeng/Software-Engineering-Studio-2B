import React from "react";
import { Redirect } from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  test: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    display: "flex",
  },
  image: {
    backgroundImage:
      "url(https://source.unsplash.com/featured/?technology,hacker)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
  },
  card: {
    justify: "center",
    alignItems: "center",
    paddingTop: "20vh",
  },
});

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(undefined);
  // const { authState, setAuthState } = React.useContext(AuthContext);
  const classes = useStyles();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Do something with email and password.
    // If errored, do setLoginError(error), whereby error is an error message.
    // setAuthState(....)

    setLoading(false);
  };

  const buildLoginError = () => {
    return (
      <>
        <Alert severity="error">Login failed</Alert>
        <br></br>
      </>
    );
  };

  const buildLoginForm = () => {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          className={classes.card}
          square="true"
        >
          <div className={classes.test}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Login</h2>
            {loginError !== undefined && buildLoginError()}
            <form onSubmit={handleLogin}>
              {/* email */}
              <div>
                <TextField
                  label="email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  required
                  fullWidth
                  onChange={handleEmailChange}
                />
              </div>
              {/* password */}
              <div>
                <TextField
                  label="password"
                  variant="outlined"
                  margin="normal"
                  name="password"
                  required
                  fullWidth
                  type="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <br></br>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.submit}
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  };

  // Redirect the user to the homepage if they are already logged in
  // tother wise show the login form
  // if (authState.authenticated) {
  // 	return <Redirect to="/" />;
  // } else {
    return buildLoginForm();
  // }
}
