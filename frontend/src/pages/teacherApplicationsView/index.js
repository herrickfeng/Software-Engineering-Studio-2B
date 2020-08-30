import React from "react";

// project components
import { AuthContext } from "../../context/auth";
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"
import TeacherApplicationsView from "../../components/applicationsView/applications.js"


// material-ui components
import { Box } from "@material-ui/core";





const Subject = () => {
	return <p>Subject</p>
}

export default class TeacherApplicationsViewPage extends React.Component {

	render() {
		return (
			<Box>
				<TeacherClassInformationView/>
				<TeacherApplicationsView/>
			</Box>
		);
	}
}