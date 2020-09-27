import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import QuestionsList from "../../components/questions/questionsListView.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


export default class TeacherQuestionsView extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined
		this.subjectId = props.match.params.subjectId;
		this.classId = props.match.params.classId;
	}

	async componentDidMount() {
		const { idToken } = this.context.authState.user;
		const classInfo = (await api.admin.subject.class.get(idToken, this.subjectId, this.classId)).data.data;
		if (classInfo.questions === undefined) {
			classInfo.questions = []
			classInfo.disabled = true;
		}
		this.setState(classInfo);
	}

	handleDisableClicked = async () => {
		this.state.disabled = !this.state.disabled;
		this.setState(this.state);

		const { idToken } = this.context.authState.user;
		if (this.state.disabled) {
			await api.admin.subject.class.update(idToken, this.subjectId, this.classId, this.state)
		}
		console.log(this.state)
	}

	handleAddQuestionBox = () => {
		this.state.questions.push({
			question: "",
			answers: [{
				text: "",
				correct: true
			}],
		})
		this.setState(this.state);
	}

	handleAddAnswerBox = (index) => {
		this.state.questions[index].answers.push({
			text: "",
			correct: false
		})
		this.setState(this.state);
	}

	handleQuestionChange = (i, value) => {
		this.state.questions[i].question = value;
		this.setState(this.state);
	}

	handleAnswerChange = (i, j, value) => {
		this.state.questions[i].answers[j] = value;
		this.setState(this.state);
	}

	handleRemoveQuestionBox = () => {
		delete this.state.questions.pop()
		this.setState(this.state);
	}

	handleRemoveAnswerBox = (i) => {
		delete this.state.questions[i].answers.pop()
		this.setState(this.state);
	}

	render() {
		if (this.state)
			return (
				<Grid container direction="column">
					<TeacherClassInformationView props={this.props} />

					<QuestionsList
						state={this.state}
						handleAddQuestionBox={this.handleAddQuestionBox}
						handleAddAnswerBox={this.handleAddAnswerBox}
						handleQuestionChange={this.handleQuestionChange}
						handleAnswerChange={this.handleAnswerChange}
						handleRemoveQuestionBox={this.handleRemoveQuestionBox}
						handleRemoveAnswerBox={this.handleRemoveAnswerBox}
					/>

					<Box my={2} display="flex" justifyContent="center" alignItems="center">
						<Box mx={2}>
							<Button
								variant="outlined"
								color="primary"
								component={Link}
								to={`/teacher/subject/${this.subjectId}/class/${this.classId}`}>
								Back
						</Button>
						</Box>

						<Box mx={2}>
							<Button variant="outlined"
								color="secondary"
								onClick={this.handleDisableClicked}>
								{this.state.disabled ? "Edit" : "Save"}
							</Button>
						</Box>
					</Box>
				</Grid>
			);
		else
			return "Loading"
	}
}