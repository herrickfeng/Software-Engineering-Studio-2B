import React from "react";
import { createRef, useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Card, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import FacialRec from "../../components/facialRec"
import { makeStyles } from "@material-ui/core/styles";

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
}));

export default function VideoStream(props) {
  const videoTag = createRef();
    let streamActive = false
    const gridStyles = useGridStyles();

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
      <Grid container direction="column" >
          <Grid item >
              <Box>
                  <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                      <Card paper style={{ height: '80px', width: '930px', backgroundColor: '#1A4B93' }}>
                          <Box textAlign="center" my={2}>
                              <Typography style={{ color: '#FFFFFF' }} variant={'h3'} align={'center'}>Facial Authentication</Typography>
                          </Box>
                      </Card>
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center" my={0} >
                      <Card paper style={{ height: '40px', width: '930px', backgroundColor: '#848F9F' }}>
                          <Box textAlign="center" my={0.5}>
                              <Typography style={{ color: '#FFFFFF' }} variant={'h6'} align={'center'}>Please show your face to check in!</Typography>
                          </Box>
                      </Card>
                  </Box>
              </Box>
          </Grid>

          <Grid component={Paper}>
              <Grid item direction="row" container classes={gridStyles}>
                  <Grid item>
                      <Box display="flex" justifyContent="center" alignItems="center" m={2} >
                          <Card paper style={{ height: '800px', width: '1050px', backgroundColor: '#1A4B93' }}>
                              <Box textAlign="center">
                                  <video ref={videoTag} width="1000vh" height="800vh" muted autoPlay></video>
                              </Box>
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
              <Grid item>
                      <Box display="flex" justifyContent="center" alignItems="center" m={2} >
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

      
    </Grid>
  )
}
