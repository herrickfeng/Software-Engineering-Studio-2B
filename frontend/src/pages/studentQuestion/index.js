import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import QuestionsList from "../../components/questions/questionListViewStudent.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


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
		this.setState({
			questions: [
				{
					"question": "This is the first question",
					"answers": [{ text: "answer1" }, { text: "answer2" }, { text: "answer3" }]
				},
				{
					"question": "This is the second question",
					"answers": [{ text: "asf" }, { text: "asdf" }]
				}
			]
		});
	}

	render() {
		if (this.state)
			return (
				<Grid container direction="column">
					<TeacherClassInformationView props={this.props} />

					<QuestionsList
						state={this.state}
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