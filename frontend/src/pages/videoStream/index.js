import React from "react";
import { createRef, useEffect, useState } from "react"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import ClassRoll from "../../components/classRoll" 
import ClassList from "../../components/classList";

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
          console.log(descriptor)
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
    console.log(classListState)
    const faceMatcher = new faceapi.FaceMatcher(filteredLabeledDescriptors, .4)
    setInterval(async () => {
      if (videoTag.current != null) {
        const detection = await faceapi.detectSingleFace(videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        if (detection) {
          bestMatch = faceMatcher.findBestMatch(detection.descriptor)
          // Send detection to subject attendance
          classListState.forEach((item) => {
            const matchInfo = item._label.split("/")
            if (item._label == bestMatch.label) {
              console.log(matchInfo[1])
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
  }
  else {
    return (
      <Grid container>
        <Grid item component={Paper}>
          <video ref={videoTag} width="1440vh" height="1120vh" muted></video>
        </Grid>
        <Grid item component={Paper}>
          <ClassRoll classList={classListState} updateClassList={setClassListState} />
        </Grid>
      </Grid>
      )
    }
}
