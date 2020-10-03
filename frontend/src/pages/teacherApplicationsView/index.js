import React from "react";
import { Link } from "react-router-dom";
import api from "../../helpers/api"

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
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined;
	}

	render() {
		return (
			<Grid>
				<TeacherClassInformationView props={this.props}/>
        <TeacherApplicationsView subjectId={this.props.match.params.subjectId} classId={this.props.match.params.classId}/>
				<Box textAlign="center" my={5}>
					<Button
						variant={"outlined"}
						color={"primary"}
						component={Link}
						to={`/teacher/subject/${this.props.match.params.subjectId}`}>
						Back
					</Button>
				</Box>
			</Grid>
		);
	}
}