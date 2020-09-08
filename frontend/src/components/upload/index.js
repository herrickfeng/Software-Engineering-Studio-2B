import React from "react";
import Input from '@material-ui/core/Input';
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress"
import api from "../../helpers/api/index";
import FormData from 'form-data';

export default function UploadImageForm() {
  const [showResult, setShowResult] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleUpload = async (event) => {
    try {
      setShowResult(false)
      setShowProgress(true)
      var file = event.target.files[0]
      var fileSend = new FormData() 
      fileSend.append('image', file)
      await api.user.upload(fileSend)
      setMessage("Success!")
      setShowResult(true)
      setShowProgress(false)
    }
    catch (error) {
      setMessage("Upload Failed. Please try again.")
      setShowResult(true)
      setShowProgress(false)
      console.log("did an oopsie")
    }
  }

  return (
    <Grid container>
      <Grid item>
        <Input type="file" onChange={handleUpload} disableUnderline />
        {showProgress ? <LinearProgress />: null}
        {showResult ? <p> {message} </p>: null}
      </Grid>
    </Grid>
  );
};
