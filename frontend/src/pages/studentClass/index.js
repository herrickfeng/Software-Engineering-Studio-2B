import React, {useState, useEffect} from "react";
import { Button, Container } from "@material-ui/core";
import ClassSlot from "../../components/classSlot/index";
import ClassSlotOption from "../../components/classSlot/ClassSlotOption";
import { Link, useHistory } from "react-router-dom";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";


export default function StudentClassPage(props) {
  const subjectId = props.match.params.subjectId;
  const classId = props.match.params.classId;
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);
  const history = useHistory();

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    const subjectClass = (await api.subject.class.get(authState.user.idToken, subjectId, classId)).data.data;
    setState({subject: subject, class: subjectClass});
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  const handleClickQuestions = async () => {
    history.push(`/student/subject/${subjectId}/class/${classId}/question`);
  }

  return (
    // TODO Loading spinner icon thingy
    (state ? 
    <Container>
      <ClassSlot data={state}>
        <ClassSlotOption completed handleClick={handleClickQuestions}>
          View Class Questions
        </ClassSlotOption>

        <ClassSlotOption incompleted>
          Verify Location (Optional)
        </ClassSlotOption>
      </ClassSlot>

      <Button mt={6} variant="outlined" color="primary" component={Link} to={`/student/subject/${subjectId}`}>Back</Button>
    </Container>
    :
    <h1>Loading</h1>
    )
  );
}