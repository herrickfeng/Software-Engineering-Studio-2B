import React from "react";
import { Link } from "react-router-dom";

// project components
import { AuthContext } from "../../context/auth";
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"
import TeacherApplicationsView from "../../components/applicationsView/applications.js"


// material-ui components
import { Box, Button, Grid } from "@material-ui/core";

const Subject = () => {
	return <p>Subject</p>
}

export default class TeacherApplicationsViewPage extends React.Component {

	render() {
		return (
			<Grid>
				<TeacherClassInformationView />
				<TeacherApplicationsView />

				<Box textAlign="center" my={5}>
					<Button
						variant={"outlined"}
						color={"primary"}
						component={Link}
						to={"/teacher/subjectList/classList"}>
						Back
					</Button>
				</Box>
			</Grid>
		);
	}
}