import React, { useEffect } from "react";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import SubjectList from "../../components/subjectList/subject.js";
import Popup from "../../components/subjectList/popup.js"

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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

		const subjectAnalytics = (await api.admin.subject.analytics(idToken)).data.data;
		this.setState({ subjectAnalytics: subjectAnalytics });
		console.log(this.state)
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
		this.setState({ subjects: this.state.subjects });
	}
	render() {
		return (
			<Box>
				<Box textAlign="center" my={5}>
					<Typography variant="h4">Subject List</Typography>
				</Box>

				<Popup addSubject={this.addSubject} />
				<SubjectList subjectState={this.state} deleteSubject={this.deleteSubject} />
			</Box>

		);
	}
}