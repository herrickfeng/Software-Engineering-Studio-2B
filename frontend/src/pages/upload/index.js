import React from "react";
import { useState } from 'react';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Grid from "@material-ui/core/Grid";
import { store } from "../../helpers/firebase"

const centreStyle = {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    padding: "0",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
};

export default function UploadImageForm() {
   const [progressValue, setProgressValue] = useState(0);

    const handleUpload = async (event) => {
        console.log("up")
        var file = event.target.files[0]
        console.log(file)
        console.log(store)
        var storageRef = store().ref(file.name)
        var task = storageRef.put(file)

        task.on('state_changed',
            function (snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                //var uploader = document.getElementById("uploader")
                setProgressValue(percentage)
            },
            function error(err) {
                switch (err.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object")
                        break;

                    case 'storage/canceled':
                        console.log("User canceled the upload")
                        break;

                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse")
                        break;

                    case 'storage/unauthenticated':
                        console.log("User is not authenticated")
                        break;
                }
            },
            function (complete) {
                console.log("Uploaded!")
            }
        )
    }

    return (
        <Grid container justifyContent="center" direction="row">
            <Grid item xs={12}>
                <div>
                    <h1> heya there </h1>
                    <h1> heya there </h1>
                    <Input type="file" onChange={handleUpload} />
                </div>
            </Grid>
            <Grid item>
                <progress value={progressValue} max="100" id="uploader"> 0% </progress>
                <h1> PLEASE </h1>
            </Grid>
        </Grid>
        );
};
