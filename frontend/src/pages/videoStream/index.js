import React from "react";
import { createRef, useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import FacialRec from "../../components/facialRec"


export default function VideoStream(props) {
  const videoTag = createRef();
  let streamActive = false

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoTag.current != null) {
          videoTag.current.srcObject = stream
          streamActive = true
        }
      })
      .catch(err => console.error(err))

    return () => {
      if (streamActive) {
        videoTag.current.srcObject.getTracks().forEach(track => track.stop()) 
      }
    }
  })

  return (
    <Grid container>
      <Grid component={Paper}>
        <video ref={videoTag} width="1440vh" height="1120vh" muted autoPlay></video>
        <Grid item direction="row" container>
          <Grid item>
            <Box textAlign="center" my={5}>
              <Button
                variant={"outlined"}
                color={"primary"}
                component={Link}
                to={`/teacher/subject/${props.match.params.subjectId}/class/${props.match.params.classId}`}>

                Back
				    </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box textAlign="center" my={5}>
              <Button
                variant={"outlined"}
                color={"primary"}
                href={"https://www.youtube.com/watch?v=qkQg9GGitow"}>

                Forwards
				      </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid component={Paper}>
        <FacialRec subjectId={props.match.params.subjectId} classId={props.match.params.classId} videoTag={videoTag} />
      </Grid>
    </Grid>
  )
}
