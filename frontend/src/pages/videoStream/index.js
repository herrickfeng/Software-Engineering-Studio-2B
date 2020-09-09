import React from "react";
import {createRef, useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid";
import * as faceapi from 'face-api.js';

export default function VideoStream() {

  const sampleClass = ['Andrew', 'Herrick', 'Jesus Christ', 'Bryan', 'Calvin', 'Brendon', 'Andy', 'Agid', 'Mitchell', 'Ryan', 'Vabnisha', 'David']
  const [mediaStream, setMediaStream] = useState(false)
  const [showDetection, setShowDetection] = useState(" ")
  //const labeledDescriptors = getImages() // This is an array of arrays. The Arrays are hold each labeled face descriptor
  const videoTag = createRef();
  const canvas = createRef();
  var bestMatch = {}
  //var labeledDescriptors = []
  /*Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ])*/
  faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')

  async function getImages() {
    console.log("test");
    const labels = ['Calvin_Dong', 'Bernie_Sanders']
    return Promise.all( //Promises to return an array of all promised values
      labels.map(async label => {
        const descriptions = [] //Array of face information to be pushed to LabeledFaceDescriptors
        const img = await faceapi.fetchImage('https://raw.githubusercontent.com/CalvinDong/FacialRecognitionTest/master/Live%20Facial%20Recognition%20Test/training/' + label + '.jpg')
        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor) //Add information of person's face to descriptions array (there can be multiple of the same person)
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }

  /*
  function getImages() {
    console.log("test");
    const labels = ['Calvin_Dong', 'Bernie_Sanders']
    return Promise.all( //Promises to return an array of all promised values
      labels.map(label => {
        const descriptions = [] //Array of face information to be pushed to LabeledFaceDescriptors
        const img = faceapi.fetchImage('https://raw.githubusercontent.com/CalvinDong/FacialRecognitionTest/master/Live%20Facial%20Recognition%20Test/training/' + label + '.jpg')
        const detections = faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor) //Add information of person's face to descriptions array (there can be multiple of the same person)
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }
  */

  async function HandleDetections(stream) {
    videoTag.current.play().then(console.log("playing"))
    const labeledDescriptors = await getImages() // This is an array of arrays. The Arrays are hold each labeled face descriptor
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, .6)
    console.log(stream.id)
    if (stream) {
      const faceSearch = setInterval(async () => {
        console.log("hello there")
        //console.log(videoTag.current.srcObject)
        if (videoTag.current != null){
          const detection = await faceapi.detectSingleFace(videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
          console.log(detection)
          if (detection) {
            bestMatch = faceMatcher.findBestMatch(detection.descriptor)
            console.log(bestMatch.label)
            //clearInterval(faceSearch)
            setShowDetection(bestMatch.label)
            //setShowDetection(Math.floor((Math.random() * 100) + 1))
          }
        }
      }, 2000)
    }
  }

  useEffect(() => {
    console.log("yee")
    setMediaStream(false)

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoTag.current.srcObject = stream
        console.log(stream)
        HandleDetections(stream)
      })
      .catch(err => console.error(err))
    //setShowDetection(Math.floor((Math.random() * 100) + 1))
    //setShowDetection(bestMatch.label)
  })


  //setShowDetection(Math.floor((Math.random() * 100) + 1))

  return (
    <div>
      <video ref={videoTag} width="1440" height="1120" muted></video>
      <div>
      <p>hello {showDetection}</p>
        <canvas ref={canvas} />
      </div>
    </div>
  );
}
