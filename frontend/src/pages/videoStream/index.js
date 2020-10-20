import React from "react";
import { createRef, useEffect, useState } from "react"

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Card, Typography, Container } from "@material-ui/core";

import { Link } from "react-router-dom";
import * as faceapi from 'face-api.js';
import { AuthContext } from "../../context/auth";
import FacialRec from "../../components/facialRec"
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  attendanceDrawer: {
    width: "28vw",
  },
  content: {
    flexGrow: 1,
    marginRight: "28vw",
  },
  videoCard: {
    backgroundColor: "#1A4B93",
  },
  video: {
    width: "45vw",
    height: "auto",
  },
  titleCard: {
    backgroundColor: "#1A4B93",
    width: "100%",
  },
}));


const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
}));

export default function VideoStream(props) {
  const classes = useStyles();
  const videoTag = createRef();
  let streamActive = false;
  const gridStyles = useGridStyles();


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
      <Grid container direction="column" >
          <Grid item >
              <Container maxWidth={"md"}>
                  <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                      <Card paper className={classes.titleCard}>
                          <Box textAlign="center" my={2}>
                              <Typography style={{ color: '#FFFFFF' }} variant={'h3'} align={'center'}>Facial Authentication</Typography>
                          </Box>
                      </Card>
                  </Box>

                  <Box mb={2}>
                      <Alert severity="info">Please show your face to check in!</Alert>
                  </Box>
              </Container>
          </Grid>

          <Grid>
              <Grid item direction="row" container classes={gridStyles}>
                  <Grid item>
                      <Box display="flex" justifyContent="center" alignItems="center" m={2} >
                          <Card paper className={classes.videoCard}>
                                <video ref={videoTag} className={classes.video} muted autoPlay></video>
                          </Card>
                      </Box>
                  </Grid>
                  <Grid item>
                      <Box display="flex" justifyContent="center" alignItems="center" m={2} >
                          <Grid component={Paper}>
                              <FacialRec subjectId={props.match.params.subjectId} classId={props.match.params.classId} videoTag={videoTag} />
                          </Grid>
                      </Box>
                  </Grid>
              </Grid>

              <Grid item direction="row" container classes={gridStyles}>
              <Grid item>
                      <Box display="flex" justifyContent="center" alignItems="center" m={2} >
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    component={Link}
                    to={`/teacher/subject/${props.match.params.subjectId}/class/${props.match.params.classId}`}>

                    Back
				        </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
    </Grid>
  )
}
