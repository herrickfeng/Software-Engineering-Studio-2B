import React, { useEffect, useState } from "react"
import { Container, Button, TableHead, TableRow, TableCell, TableBody, Box } from "@material-ui/core";
//DO I NEED TO CHANGE BELOW IMPORT TO BE FROM TEACHER PROFILE if it's doing the same thing as in student profile?
// import Popup from "../../components/studentProfile/popup";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";
import { Alert } from "@material-ui/lab";
import LinedTable from "../../components/linedTable/index";
import { Link } from "react-router-dom";
import UploadImageForm from "../../components/upload"; 
import {makeStyles} from "@material-ui/core/styles";

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
        name: "Peter Pan",
        id: "12345678",
        email: "hsu.myat.win@uts.edu.au",
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

  // const updateProfile = async (userData) => {
  //   // TODO: Error toast 
  //   setProfileState(userData);
  //   api.user.update(authState.user.idToken, authState.user.uid, userData)
  // }

  const handleResetPassword = async () => {
    // TODO: Error toast 
    // await api.auth.reset(profileState.email);
  }

  return (
    <Container maxWidth={"md"}>
      {/* TODO: LOADING  */}
      {profileState ? (
      <>
       {/* < TeacherProfile profileState={profileState} setState={setProfileState} handleResetPassword={handleResetPassword}/> */}

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
                <Button variant="contained" color="primary" onClick={handleResetPassword} >Email Reset Link</Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
            <TableCell align="left">
              <img className={classes.image} src={profileState.image} height="200vh" />
            </TableCell>
            <TableCell>
              <UploadImageForm setState={setProfileState}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </LinedTable>

        <Box>
          {/* <Popup profileState={profileState} updateProfile={updateProfile} /> */}
        </Box>
      </>)
        :
        <h1>Loading</h1>
      }
    </Container>

      

  );
}