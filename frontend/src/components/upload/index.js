import React from "react";
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import CircularProgress from "@material-ui/core/CircularProgress"
import api from "../../helpers/api/index";
import FormData from 'form-data';
import { AuthContext } from "../../context/auth";

export default function UploadImageForm(props) {
  const [showResult, setShowResult] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { authState } = React.useContext(AuthContext);

  const handleUpload = async (event) => {
    try {
      setShowResult(false)
      setShowProgress(true)
      let file = event.target.files[0]
      let fileSend = new FormData()
      const fileName = authState.user.uid
      fileSend.append('image', file, fileName)
      await api.user.upload(authState.user.idToken, authState.user.uid, fileSend);
      setMessage("Success!")
      setShowResult(true)
      setShowProgress(false)
      props.setState(undefined)
    }
    catch (error) {
      setMessage(error.response.data.msg)
      setShowResult(true)
      setShowProgress(false)
      console.log("did an oopsie", error.response)
    }
  }

  const uploadButton = () => {
    return (<Button variant="contained" component="label" color='primary'>
      Upload File
      <Input type="file" style={{ display: "none" }} onChange={handleUpload} disableUnderline />
    </Button>
    )
  }

  return (
    <div>
      {showProgress ? <CircularProgress color="primary" /> : uploadButton()}
      {showResult ? <p> {message} </p> : null}
    </div>
  );
};
