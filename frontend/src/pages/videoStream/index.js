import React from "react";
import Grid from "@material-ui/core/Grid";
import * as faceapi from 'face-api.js';

export default function VideoStream() {
  const videoTag = React.createRef();
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ])

  React.useEffect(() => {
    console.log("yee")
    navigator.getUserMedia(
      { video: {} },
      stream => videoTag.current.srcObject = stream,
      err => console.error(err)
    )
  })

  return (
    <Grid container>
      <Grid item>
        <p> hi </p>
        <video id="video" width="1440" height="1120" autoPlay muted ref={videoTag}></video>
      </Grid>
    </Grid>
  );
}
