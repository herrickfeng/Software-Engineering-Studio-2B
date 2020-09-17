import React from "react";
import {createRef, useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"

export default function VideoStream() {
  const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjczNzVhZmY3MGRmZTNjMzNlOTBjYTM2OWUzYTBlZjQxMzE3MmZkODIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2FsdmluIiwic3R1ZGVudCI6dHJ1ZSwidGVhY2hlciI6ZmFsc2UsImFkbWluIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZhY2UtYXR0ZW5kYW5jZS1zeXN0ZW0tdGhpbmciLCJhdWQiOiJmYWNlLWF0dGVuZGFuY2Utc3lzdGVtLXRoaW5nIiwiYXV0aF90aW1lIjoxNjAwMzA4NDc3LCJ1c2VyX2lkIjoiYnNQQ0t0WW42c2dmeHZLWjVXODZEV2tSeHFHMyIsInN1YiI6ImJzUENLdFluNnNnZnh2S1o1Vzg2RFdrUnhxRzMiLCJpYXQiOjE2MDAzMDg0NzcsImV4cCI6MTYwMDMxMjA3NywiZW1haWwiOiJjYWx2aW5Ac3R1ZGVudC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiY2FsdmluQHN0dWRlbnQuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MDIfWh1ulHobpEs2bO1xoyW0KlRPL816n1B2qo1Tibc1yTwLmFUsxMe_qll-jSakF6Www4iqGG16XYBFnzuwyKRsy9GfrkYJ5gcuvivdFmDfSaH51L-QfSZ9faVP_lt8AqSQeRTtnqG_a9MJHbBV24gYMAdUULG8SJxHZSYMersKOVJt8bdI-g7Ij0Iidzh9s4jE0oWxPzTyd6dfI5FpZ5t_znC2GraT-IO7t6hfTMP5Isz1TPyM-RXXzwiWas306g2cMffRZbvQJpgSi6DRzJP_kyEshzCuv67sewVUz5xK_wbK9QhxTPzLeEj855JaFB9eEynZ1HbCERLoFscVzw"

  const [showDetection, setShowDetection] = useState(" ")
  const videoTag = createRef();
  let bestMatch = {}
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ])

  async function getImages() {
    const subject = await api.subject.get(idToken, "153a7909-e4b2-4529-bf2a-5c55fdc3cfea")
    const studentList = subject.data.data.students;
    return Promise.all(
      studentList.map(async label => {
        const descriptions = []
        const userData = await api.user.getById(idToken, label)
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
          console.log(bestMatch.label)
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
