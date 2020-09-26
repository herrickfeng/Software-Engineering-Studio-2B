import React from "react";
import { createRef, useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import ClassRoll from "../../components/classRoll" 
import FacialRec from "../../components/facialRec"


export default function VideoStream(props) {
  const videoTag = createRef();
  console.log("video")

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoTag.current != null) {
          videoTag.current.srcObject = stream
          console.log(stream)
        }
      })
      .catch(err => console.error(err))

    return () => {
      if (videoTag.current != null) {
        videoTag.current.srcObject.getTracks().forEach(track => track.stop()) //change to use stream
      }
    }
  })

  return (
    <div>
      <video ref={videoTag} width="1440vh" height="1120vh" muted autoPlay></video>
      <FacialRec subjectId={props.match.params.subjectId} classId={props.match.params.classId} videoTag={videoTag}/>
    </div>
  )
}
