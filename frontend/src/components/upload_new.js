import React from "react";
import Input from '@material-ui/core/Input';
import Grid from "@material-ui/core/Grid";
import api from "../helpers/api/index";
import FormData from 'form-data'

export default function UploadImageForm() {
  const handleUpload = async (event) => {
    try {
      var file = event.target.files[0]
      var fileSend = new FormData() 
      fileSend.append('image', file);
      await api.user.upload(fileSend)
    }
    catch (error) {
      //just add the error stuff here
      console.log("did an oopsie")
    }
  }

  return (
    <Grid container direction="column">
      <Grid item justifyContent="center">
        <Input type="file" onChange={handleUpload} />
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
        <h1> HEY </h1>
      </Grid>
    </Grid>
  );
};
