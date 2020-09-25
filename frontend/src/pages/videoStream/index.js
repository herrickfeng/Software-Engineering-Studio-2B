import React from "react";
import { createRef, useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import ClassRoll from "../../components/classRoll" 

export default function VideoStream(props) {
  const { authState } = React.useContext(AuthContext);
  const [classListState, setClassListState] = useState(undefined);
  const videoTag = createRef();
  let bestMatch = {}
  let labeledDescriptors;
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ])

  async function getImages() {
    const subject = await api.subject.get(authState.user.idToken, props.match.params.subjectId)
    const studentList = subject.data.data.students;
    return Promise.all(
      studentList.map(async label => {
        const descriptions = []
        const studentData = await api.user.getById(authState.user.idToken, label)
        const studentName = studentData.data.data.displayName
        label = label.concat(`/${studentName}`)
        if (studentData.data.data.descriptor) {
          const descriptor = new Float32Array(Object.values(studentData.data.data.descriptor))
          descriptions.push(descriptor)
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
        } else {
          console.log(`Descriptor for ${studentData.data.data.studentId} does not exist`);
          label = label.concat("/null")
          const descriptor = new Float32Array(128).fill(0)
          descriptions.push(descriptor)
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
        }
      })
    )
  }

  async function HandleDetections() {
    videoTag.current.play().then(console.log("playing"))
    labeledDescriptors = classListState
    const filteredLabeledDescriptors = labeledDescriptors.filter(ld => ld != undefined) // Remove any undefined elements
    const faceMatcher = new faceapi.FaceMatcher(filteredLabeledDescriptors, .4)
    setInterval(async () => {
      if (videoTag.current != null) {
        const detection = await faceapi.detectSingleFace(videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        if (detection) {
          bestMatch = faceMatcher.findBestMatch(detection.descriptor)
          classListState.forEach(async (item) => {
            const matchInfo = item._label.split("/")
            if (item._label == bestMatch.label) {
              console.log(matchInfo[1])
              const attendance = await api.subject.attend.get(authState.user.idToken, props.match.params.subjectId, props.match.params.classId, matchInfo[0])
              if (!attendance.data.data.facial) {
                await api.subject.attend.updateSpec(authState.user.idToken, props.match.params.subjectId, props.match.params.classId, matchInfo[0], "facial") // Send detection to subject attendance
                console.log("updated attendance")
              }
              else {
                console.log("detected person is already marked")
                console.log(attendance.data.data.facial)
              }
            }
          })
        }
      }
    }, 2000)
  }

  const buildLoad = async() => {
    labeledDescriptors = await getImages()
    setClassListState(labeledDescriptors)
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoTag.current != null) {
          videoTag.current.srcObject = stream
          console.log(stream)
          HandleDetections()
        }
      })
      .catch(err => console.error(err))
  })

  if (!classListState) {
    console.log("load")
    buildLoad()
    return (
      <div>
        <h1> Loading </h1>
      </div>
    )
  } else {
    return (
      <Grid container>
        <Grid item component={Paper}>
          <video ref={videoTag} width="1440vh" height="1120vh" muted></video>
        </Grid>
        <Grid item component={Paper}>
          <ClassRoll subjectId={props.match.params.subjectId} classId={props.match.params.classId} idToken={authState.user.idToken}/>
        </Grid>
      </Grid>
      )
    }
}
