import React, { useEffect, useState } from "react"
import StudentProfile from "../../components/studentProfile/index";
import { Container, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Popup from "../../components/studentProfile/popup";
import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

export default function StudentProfilePage(props) {
  const { authState } = React.useContext(AuthContext);
  const [profileState, setProfileState] = useState(undefined);

  const fetchData = async () => {
    const userData = await api.user.get(authState.user.idToken)
    setProfileState(userData.data.data);
  };

  useEffect(() => {
    if (profileState === undefined) {
      fetchData();
    }
  });

  const updateProfile = async (userData) => {
    // TODO: Error toast 
    await api.user.update(authState.user.idToken, authState.user.uid, userData);
    console.log(userData)
    setProfileState(userData);
  }

  const handleResetPassword = async () => {
    // TODO: Error toast 
    await api.auth.reset(profileState.email);
  }


  return (
    <Container maxWidth={"md"}>
      {/* TODO: LOADING  */}
      {profileState ? [
        < StudentProfile profileState={profileState} handleResetPassword={handleResetPassword}/>,
        <Box>
          <Popup profileState={profileState} updateProfile={updateProfile} />
        </Box>]
        :
        <h1>Loading</h1>
      }
    </Container>
  );
}