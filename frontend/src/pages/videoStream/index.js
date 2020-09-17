import React from "react";
import {createRef, useEffect, useState} from "react"
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";

export default function VideoStream(props) {

  const { authState } = React.useContext(AuthContext);

  const [showDetection, setShowDetection] = useState(" ")
  const videoTag = createRef();
  let bestMatch = {}
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
        const userData = await api.user.getById(authState.user.idToken, label)
        if (userData.data.data.descriptor) {
          const descriptor = new Float32Array(Object.values(userData.data.data.descriptor))
          descriptions.push(descriptor)
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
        } else {
          console.log(`Descriptor for ${userData.data.data.studentId} does not exist`);
        }
      })
    )
  }


  async function HandleDetections() {
    videoTag.current.play().then(console.log("playing"))
    const labeledDescriptors = await getImages()
    const filteredLabeledDescriptors = labeledDescriptors.filter(ld => ld != undefined) // Remove any undefined elements
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(filteredLabeledDescriptors, .6)
    setInterval(async () => {
      if (videoTag.current != null){
        const detection = await faceapi.detectSingleFace(videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        if (detection) {
          bestMatch = faceMatcher.findBestMatch(detection.descriptor)
          console.log(bestMatch.label)// Send detection to class roll
          setShowDetection(bestMatch.label)
        }
      }
    }, 2000)
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoTag.current.srcObject = stream
        console.log(stream)
        HandleDetections()
      })
      .catch(err => console.error(err))
  })


  //setShowDetection(Math.floor((Math.random() * 100) + 1))

  return (
    <div>
      <video ref={videoTag} width="1440" height="1120" muted></video>
      <div>
        <p>hello are you {showDetection}?</p>
        <button> yes </button>
        <button> no </button>
      </div>
    </div>
  );
}
