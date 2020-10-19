import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Box } from "@material-ui/core";
import ClassSlot from "../../components/classSlot/index";
import ClassSlotOption from "../../components/classSlot/ClassSlotOption";
import { Link, useHistory } from "react-router-dom";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";
import TeacherAttendanceVerification from "../../components/questions/teacherAttendanceVerification"
import LoadingSpinner from "../../components/loadingSpinner";


export default function StudentClassPage(props) {
  const subjectId = props.match.params.subjectId;
  const classId = props.match.params.classId;
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);
  const history = useHistory();

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    const subjectClass = (await api.subject.class.get(authState.user.idToken, subjectId, classId)).data.data;
    const attendance = (await api.subject.attend.get(authState.user.idToken, subjectId, classId, authState.user.uid)).data.data;
    setState({ subject: subject, class: subjectClass, attendance: attendance });
    console.log("teacher", attendance.teacher=== undefined)
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  const handleClickQuestions = async () => {
    history.push(`/student/subject/${subjectId}/class/${classId}/question`);
  }

  const handleClickLocation = async () => {
    history.push(`/student/subject/${subjectId}/class/${classId}/location`);
  }

  const handleTeacherVerification = async (teacherVerification) => {
    console.log(teacherVerification)
    await api.subject.attend.teacher(authState.user.idToken, subjectId, classId, authState.user.uid, { teacher: teacherVerification })
    setState(undefined)
  }

  return (
    // TODO Loading spinner icon thingy
    (state ?
      <Container>
        <ClassSlot data={state}>
          <ClassSlotOption completed={state.attendance.question} handleClick={handleClickQuestions}>
            View Class Questions
          </ClassSlotOption>

          <ClassSlotOption completed={state.attendance.location} handleClick={handleClickLocation}>
            Verify Location
          </ClassSlotOption>

          <ClassSlotOption completed={state.attendance.facial}>
            Facial Authentication
          </ClassSlotOption>

          <ClassSlotOption completed={state.attendance.teacher !== undefined}>
            Teacher Attendance Verification
            <TeacherAttendanceVerification onClick={handleTeacherVerification} completed={state.attendance.teacher !== undefined}/>
          </ClassSlotOption>
        </ClassSlot>

        <Button mt={6} variant="outlined" color="primary" component={Link} to={`/student/subject/${subjectId}`}>Back</Button>
      </Container>
      :
      <LoadingSpinner/>
    )
  );
}