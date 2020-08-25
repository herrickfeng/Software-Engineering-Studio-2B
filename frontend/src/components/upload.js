import React from "react";
import Input from '@material-ui/core/Input';
import Grid from "@material-ui/core/Grid";
import { store } from "../helpers/firebase"

export default function UploadImageForm() {
    const [progressValue, setProgressValue] = React.useState(0)
    const [showText, setShowField] = React.useState(false)
    const [showResult, setShowResult] = React.useState("")

    const handleUpload = async (event) => {
        try {
            setShowField(false)
            setProgressValue(0)
            var file = event.target.files[0]
            var storageRef = store().ref(file.name)
            var task = storageRef.put(file)

            task.on('state_changed',
                function (snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgressValue(percentage)
                },
                function error(err) {
                    setShowResult("Something went wrong :(")
                    setShowField(true)
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
                    setShowResult("Image Uploaded!")
                    setShowField(true)
                    console.log("Uploaded!")
                }
            )
        }
        catch (error) {
            console.log("did an oopsie")
        }
    }

    return (
        <Grid container direction="column">
            <Grid item justifyContent="center">
                <Input type="file" onChange={handleUpload} />
            </Grid>
            <Grid item>
                <progress value={progressValue} max="100" />
                {showText ? <b>{showResult}</b> : null}
            </Grid>
        </Grid>
    );
};
