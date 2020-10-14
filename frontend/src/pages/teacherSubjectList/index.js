import React, { useEffect } from "react";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import SubjectList from "../../components/subjectList/subject.js";
import Popup from "../../components/subjectList/popup.js"

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box, Card, Container } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class TeacherSubjectListPage extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined;
	}

	async componentDidMount() {
		const { idToken } = this.context.authState.user;
		const subjects = (await api.admin.subject.getAll(idToken)).data.data;
		this.setState({ subjects });
	}

	deleteSubject = async (subjectId) => {
		const { idToken } = this.context.authState.user;
		await api.admin.subject.delete(idToken, subjectId);
		this.setState({ subjects: this.state.subjects.filter((subject) => subject.subjectId !== subjectId) });
	}

	addSubject = async (subjectData) => {
		const { idToken } = this.context.authState.user;
		const subject = (await api.admin.subject.create(idToken, subjectData)).data.data;
		console.log(subject)
		this.state.subjects.push(subject);
		this.setState({ subjects: this.state.subjects});
	}

	render() {
		return (
			<Container maxWidth={"md"}>
				<Box display="flex" justifyContent="center" alignItems="center" my={2} >
					<Card paper style={{ height: '80px', width: '930px', backgroundColor: '#1A4B93' }}>
						<Box textAlign="center" my={2}>
							<Typography style={{ color: '#FFFFFF' }} variant={'h3'} align={'center'}>Subject List</Typography>
						</Box>
					</Card>
				</Box>
				<Box mb={2}>
					<Alert severity="info">Add a Subject to your subject list below!</Alert>
				</Box>
				<Popup addSubject={this.addSubject} />
        <SubjectList subjectState={this.state} deleteSubject={this.deleteSubject} />
      </Container>

		);
	}
}