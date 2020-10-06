import React, { useEffect, useState } from "react"
import { Container, Button, TableHead, TableRow, TableCell, TableBody, Box, Grid, Typography} from "@material-ui/core";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";
import { Alert } from "@material-ui/lab";
import LinedTable from "../../components/linedTable/index";
import { Link } from "react-router-dom";
import UploadImageForm from "../../components/upload"; 
import {makeStyles} from "@material-ui/core/styles";
import Popup from "../../pages/teacherProfile/popup";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit:"contain"
  },
}))

export default function TeacherProfilePage(props) {

  const { authState } = React.useContext(AuthContext);
  const [profileState, setProfileState] = useState(undefined);
  const classes = useStyles();
  
  useEffect(() => {
    setProfileState (
      {
        name: "Jane Doe",
        id: "12345678",
        email: "jane.doe@uts.edu.au",
        password: "*********",
      }
    )
  },[])
  
  
  // const fetchData = async () => {
  //   const userData = await api.user.get(authState.user.idToken)
  //   setProfileState(userData.data.data);
  //   console.log(userData)
  //   console.log(authState.user.idToken)
  // };

  // useEffect(() => {
  //   if (profileState === undefined) {
  //     fetchData();
  //   }
  // });

  const updateProfile = async (userData) => {
    // TODO: Error toast 
    setProfileState(userData);
    // api.user.update(authState.user.idToken, authState.user.uid, userData)
  }

  const handleResetPassword = async () => {
    // TODO: Error toast 
    // await api.auth.reset(profileState.email);
  }

  return (
    <Container maxWidth={"md"}>
      {/* TODO: LOADING  */}
      {profileState ? (
      <>
       <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
>
      <Typography variant="h4" gutterBottom>
          Profile
      </Typography>
      <img className={classes.image} src={profileState.image} height="200vh" />
      <Typography variant="subtitle1" gutterBottom>
          Profile picture
      </Typography>
    </Grid>
        <LinedTable>
          <TableBody>
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell>{profileState.name}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Staff ID:</TableCell>
              <TableCell>{profileState.id}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Email Address:</TableCell>
              <TableCell>{profileState.email}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>
              {profileState.password}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
          </TableBody>
          <TableBody>
            <TableRow>
            <TableCell align="left">
              Profile Picture
            </TableCell>
            <TableCell>
              <UploadImageForm setState={setProfileState}/>
              </TableCell>
            </TableRow>
        </TableBody>
        </LinedTable>
        
        {/* < TeacherProfilePage profileState={profileState} setState={setProfileState} handleResetPassword={handleResetPassword}/>, */}
        <Box>
          <Popup profileState={profileState} updateProfile={updateProfile} />
        </Box>
      </>)
        :
        <h1>Loading</h1>
      }

    </Container>

  );
}