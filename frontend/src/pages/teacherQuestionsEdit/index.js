import React from "react";
import { Link } from "react-router-dom";

// project components
import { AuthContext } from "../../context/auth";
import QuestionsList from "../../components/questions/questionsListEdit.js"
import TeacherClassInformationView from "../../components/applicationsView/ClassInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


export default class TeacherQuestionsEdit extends React.Component {

	render() {
		return (
			<Grid container direction="column">
				<TeacherClassInformationView />

				<QuestionsList />

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					<Box mx={2}>
						<Button
							variant="outlined"
							color="primary"
							component={Link}
							to={"/teacher/subjectList/classList/applicationsView/TeacherQuestionsView"}>
							Back
						</Button>
					</Box>

					<Box mx={2}>
						<Button variant="outlined"
							color="secondary"
							component={Link}
							to={"/teacher/subjectList/classList/applicationsView/TeacherQuestionsView"}>
							Save
						</Button>
					</Box>
				</Box>
			</Grid>
		);
	}
}