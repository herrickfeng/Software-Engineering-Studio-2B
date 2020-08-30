import React from "react";

// project components
import { AuthContext } from "../../../context/auth";
import TeacherClassInformationView from "../../../components/applicationsView/classInformation.js"
import TeacherApplicationsView from "../../../components/applicationsView/applications.js"


// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';




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