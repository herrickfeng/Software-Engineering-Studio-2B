import React, {useState, useEffect} from "react";

// project components
import TeacherAddClassPopup from "../../components/classList/TeacherAddClassPopup.js";
import GenerateClass from "../../components/TeacherAddClassPopup/index.js"


// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container, Card } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import ClassList from "../../components/classList/index";
import { Link, useHistory} from "react-router-dom";
import api from "../../helpers/api"
import { AuthContext } from "../../context/auth";
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TeacherClassListPage(props) {
  const subjectId = props.match.params.subjectId;
  const { authState } = React.useContext(AuthContext);
  const [state, setState] = useState(undefined);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
    const history = useHistory();
    const classes = useStyles();

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    subject.classes = (await api.subject.class.getAll(authState.user.idToken, subjectId)).data.data;
    setState(subject);
  };

  useEffect(() => {
    if (state === undefined) {
      fetchData();
    }
  });

  function onRowClick(event, entry) {
    history.push(`/teacher/subject/${subjectId}/class/${entry.classId}`);
  }

	const addClass = async (classData) => {
		const { idToken } = authState.user;
    const subjectClass = (await api.admin.subject.class.create(idToken, subjectId, classData)).data.data.data;
		setState(undefined);
	}

  const handleGenerate = async (data) => {
    // TODO: Error toast
    data.occurrence = parseInt(data.occurrence);
		const { idToken } = authState.user;
    await api.admin.subject.class.generate(authState.user.idToken, subjectId, data);
		setState(undefined);

    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



  return (
    (state ? 
          <Container maxWidth={"md"}>
              <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                  <Card paper style={{ height: '80px', width: '930px', backgroundColor: '#1A4B93' }}>
                      <Box textAlign="center" my={2}>
                          <Typography style={{ color: '#FFFFFF' }} variant={'h4'} align={'center'}>{state.subjectName} Class List</Typography>
                      </Box>
                  </Card>
              </Box>

              <Box className={classes.root} mb={2}>
                  <Alert severity="info">Generate the classes for your subject.</Alert>
              </Box>

      <Box>
        <TeacherAddClassPopup />
      </Box>

      <Box>
         <GenerateClass handleGenerate={handleGenerate} />
      </Box>

      <Box>
        <ClassList backTo="/student/dashboard" onRowClick={onRowClick} data={state.classes}/>

        <Box my={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" component={Link} to="/teacher/subjectList">
            Back
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setOpenAddPopup(true)}>
            + Add Class
          </Button>
        </Box>
      </Box>

      <TeacherAddClassPopup open={openAddPopup} onClose={() => setOpenAddPopup(false)} onAdd={addClass}/>
    </Container>
    // TODO: Loading spinner icon thingy
    : <h1>Loading</h1>
    )
  );
}