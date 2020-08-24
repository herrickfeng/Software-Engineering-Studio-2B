import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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

const handleUpload = async (event) => {
    console.log("up")
    console.log(event.target.files[0])
}

export default function uploadImageForm(props) {
    return (
        <Grid container justifyContent="center" direction="row">
            <Grid item xs={12}>
                <div>
                    <h1> heya there </h1>
                    <h1> heya there </h1>
                    <input type="file" onChange={handleUpload}/>
                </div>
            </Grid>
            <Grid>
                <h1> PLEASE </h1>
            </Grid>
        </Grid>
        );
};
