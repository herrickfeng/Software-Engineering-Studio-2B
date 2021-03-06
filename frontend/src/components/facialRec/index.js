import React, { useEffect, useState } from "react";
import * as faceapi from 'face-api.js';
import api from "../../helpers/api/index"
import { AuthContext } from "../../context/auth";
import ClassAttendanceList from "./ClassAttendanceList"
import LoadingSpinner from "../loadingSpinner"


export default function FacialRec(props) {
  const {authState} = React.useContext(AuthContext);
  const [classListState, setClassListState] = useState(undefined);
  let bestMatch = {};
  let labeledDescriptors;
  let reRender = false;
  let detectionFound = false;
  let interval;
  let intervalRunning = false;
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ]);

  async function getImages() {
    const subject = await api.subject.attend.getByCl(authState.user.idToken, props.subjectId, props.classId);
    const studentList = subject.data.data;
    return Promise.all(
      studentList.map(async label => {
        const descriptions = [];
        const studentData = await api.user.getById(authState.user.idToken, label.uid);
        const studentName = studentData.data.data.displayName;
        label.uid = label.uid.concat(`/${studentName}/${label.facial}`);
        if (studentData.data.data.descriptor) {
          const descriptor = new Float32Array(Object.values(studentData.data.data.descriptor));
          descriptions.push(descriptor);
          return new faceapi.LabeledFaceDescriptors(label.uid, descriptions)
        } else {
          console.log(`Descriptor for ${studentData.data.data.studentId} does not exist`);
          label.uid = label.uid.concat("/null");
          const descriptor = new Float32Array(128).fill(0);
          descriptions.push(descriptor);
          return new faceapi.LabeledFaceDescriptors(label.uid, descriptions)
        }
      })
    )
  }

  function HandleDetections() {
    labeledDescriptors = classListState;
    const filteredLabeledDescriptors = labeledDescriptors.filter(ld => ld !== undefined); // Remove any undefined elements
    const faceMatcher = new faceapi.FaceMatcher(filteredLabeledDescriptors, .4);
    if (!intervalRunning) {
      intervalRunning = true;
      interval = setInterval(async () => {
        if (props.videoTag.current != null) {
          const detection = await faceapi.detectSingleFace(props.videoTag.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
          if (detection && detectionFound === false) {
            detectionFound = true;
            bestMatch = faceMatcher.findBestMatch(detection.descriptor);

            // Use promise + map here instead of forEach so we actually await the results of the async calls
            Promise.all(classListState.map(async (item) => {
              const matchInfo = item._label.split("/");
              if (item._label === bestMatch.label) {
                console.log(matchInfo[1]);
                let attendance = (matchInfo[2] === 'true'); // Convert to boolean
                if (!attendance) {
                  attendance = true;
                  await api.subject.attend.updateSpec(authState.user.idToken, props.subjectId, props.classId, matchInfo[0], "facial"); // Send detection to subject attendance
                  item._label = `${matchInfo[0]}/${matchInfo[1]}/true`;
                  console.log("updated attendance");
                  reRender = true
                }
              }
            })).then(() => {
              detectionFound = false;
              if (reRender) {
                reRender = false;
                setClassListState(classListState)
              }
            })
          }
        }
      }, 3000);
    }
  }

  useEffect(() => {// Clean up on unmount

    return () => {
      reRender = false;
      if (intervalRunning) {
        clearInterval(interval);
        intervalRunning = false;
      }
    }

  }, []);

  const buildLoad = async () => {
    labeledDescriptors = await getImages();
    setClassListState(labeledDescriptors)
  };

  if (!classListState) {
    buildLoad();
    return (
      <div>
        <LoadingSpinner/>
      </div>
    );
  } else {
    HandleDetections();
    return (
      <ClassAttendanceList attendanceList={classListState} subjectId={props.subjectId} classId={props.classId}
                           idToken={authState.user.idToken} />
    );
  }
}
