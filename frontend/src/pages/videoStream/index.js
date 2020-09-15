import React from "react";
import {createRef, useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"

export default function VideoStream() {

  /*
  const sampleClass = [
    '4UIjqGTLo5UvUL42juUU0cT05kf2',
    '10pfIkcBBwfbLfCqp9EedlJhHjt1',
    '7sS9jJ0HAjOkyEcRq2zr9bwfMFa2',
    'mCxm0I2I0wc2VYb4dktQxC5OZuJ3',
    '9uyzaLD235YjRwPxpUunS71gOQW2',
    'LmUyt7oSimO1aPM0v9Usw4zxRNP2',
    '4UIjqGTLo5UvUL42juUU0cT05kf2',
    'ifqV3hCwScgnr24LtXOXpKB3O8n1',
    'O03MbmTBYAUv68SOcsKLZgpvoAW2',
    'WSzHDHqUSOWQEZkh8BigJ8pOKkA3',
    'ENYh7F3VePgq9Nc7EjuHQahRxl53'
  ]
  */

  const sampleClass = [
    'mCxm0I2I0wc2VYb4dktQxC5OZuJ3',
    '9uyzaLD235YjRwPxpUunS71gOQW2',
    'LmUyt7oSimO1aPM0v9Usw4zxRNP2'
  ]

  const [mediaStream, setMediaStream] = useState(false)
  const [showDetection, setShowDetection] = useState(" ")
  //const labeledDescriptors = getImages() // This is an array of arrays. The Arrays are hold each labeled face descriptor
  const videoTag = createRef();
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
  const img = new Image()
  const labeledDescriptors = getImages()

  /*
  function b64ToBlob(imageDown) {
    const byteCharacters
  }*/

  async function getImages() {
    const imageDown = await api.user.download("9uyzaLD235YjRwPxpUunS71gOQW2").then(async function (image) {
      console.log(imageDown)
      await fetch(imageDown).then(async res => {
        console.log("")
        const imageBlob = res.blob()
        const dect = await faceapi.fetchImage(imageBlob)
        console.log(dect)

      })
      //img.src = image
      //console.log(img.src)
      //await faceapi.fetchImage(img)
    })

        //const imageDown = await api.user.download("9uyzaLD235YjRwPxpUunS71gOQW2")
  }
  
  /*
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
  */

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

  async function HandleDetections() {
    videoTag.current.play().then(console.log("playing"))
    const labeledDescriptors = await getImages() // This is an array of arrays. The Arrays are hold each labeled face descriptor
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, .6)
    setInterval(async () => {
      if (videoTag.current != null){
        const detection = await faceapi.detectSingleFace(videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        console.log(detection)
        if (detection) {
          bestMatch = faceMatcher.findBestMatch(detection.descriptor)
          console.log(bestMatch.label)
          //clearInterval(faceSearch)
          setShowDetection(bestMatch.label)
        }
      }
    }, 2000)
  }

  useEffect(() => {
    console.log("yee")

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
