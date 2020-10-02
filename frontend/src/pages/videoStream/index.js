import React from "react";
import { createRef, useEffect, useState } from "react"
import { Box, Button, Drawer, Toolbar, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as faceapi from 'face-api.js';
import { AuthContext } from "../../context/auth";
import FacialRec from "../../components/facialRec"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  attendanceDrawer: {
    width: "28vw",
  },
  video: {
    width: "50vw",
    height: "auto",
  },
  content: {
    flexGrow: 1,
    marginRight: "28vw",
  },
}));


export default function VideoStream(props) {
  const videoTag = createRef();
  const classes = useStyles();
  let streamActive = false;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoTag.current != null) {
          videoTag.current.srcObject = stream;
          streamActive = true;
        }
      })
      .catch(err => console.error(err));

    return () => {
      if (streamActive) {
        videoTag.current.srcObject.getTracks().forEach(track => track.stop()) ;
      }
    }
  });

  return (
    <div>
      <Box className={classes.content}>
        <Box m={2}>
          <Box display="flex" justifyContent="center">
            <div className={classes.video}>
              <video ref={videoTag} width="100%" height="100%" muted autoPlay />
            </div>
          </Box>

          <Box my={6}>
            <Grid item direction="row" container>
              <Grid item>
                <Box textAlign="center" mx={1}>
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
                <Box textAlign="center" mx={1}>
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    href={"https://www.youtube.com/watch?v=qkQg9GGitow"}>

                    Forwards
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Drawer classes={{paper: classes.attendanceDrawer}} anchor="right" variant="permanent">
        <Toolbar/>
        <FacialRec subjectId={props.match.params.subjectId} classId={props.match.params.classId} videoTag={videoTag} />
      </Drawer>
    </div>
  )
}
