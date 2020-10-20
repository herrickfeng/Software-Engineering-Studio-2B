import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import QuestionsList from "../../components/questions/questionListViewStudent.js"
import TeacherClassInformationView from "../../components/applicationsView/ClassInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// Should probably be moved to the backend
function stripQuestionAnswers(questions) {
	for (const question in questions) {
		for (const answer in questions[question].answers) {
			questions[question].answers[answer].correct = false;
		}
	}
	return questions;
}

export default class StudentQuestionsView extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined
		this.subjectId = props.match.params.subjectId;
		this.classId = props.match.params.classId;
	}

	async componentDidMount() {
		const { idToken } = this.context.authState.user;
		const classData = (await api.subject.class.get(idToken, this.subjectId, this.classId)).data.data;
		if (classData.questions) {
			classData.questions = stripQuestionAnswers(classData.questions)
		}
		this.setState(classData);
	}

	handleAnswerChange = (i, j, value) => {
		this.state.questions[i].answers[j] = value;
		this.setState(this.state);
	}

	handleSubmitClicked = async () => {
		const { idToken, uid } = this.context.authState.user;
		const res = await api.subject.attend.questions(idToken, this.subjectId, this.classId, uid, this.state.questions)
	}

	render() {
		if (this.state)
			return (
				<Grid container direction="column">
					<TeacherClassInformationView props={this.props} />

					{this.state.questions ?
						<QuestionsList
							state={this.state}
							handleAnswerChange={this.handleAnswerChange}/> :
						<Box mx={2} display="flex" justifyContent="center" alignItems="center">
							<Typography>
								<p>Your teacher has not set any questions for this class.</p>
							</Typography>
						</Box>
					}

					<Box my={2} display="flex" justifyContent="center" alignItems="center">
						<Box mx={2}>
							<Button
								variant="outlined"
								color="primary"
								component={Link}
								to={`/student/subject/${this.subjectId}/class/${this.classId}`}>
								Back
						</Button>
						</Box>

						<Box mx={2}>
							<Button variant="contained"
								color="primary"
								onClick={this.handleSubmitClicked}
								disabled={this.state.questions ? false : true}
								component={Link} to={`/student/subject/${this.subjectId}/class/${this.classId}/`}>
								Submit
							</Button>
						</Box>
					</Box>
				</Grid>
			);
		else
			return "Loading"
	}
}