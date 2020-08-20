import React from "react";

// project components
import SubjectList from "../../../components/teacherDashboard/teacherSubjectList/index.js";
import { AuthContext } from "../../../context/auth";
import Popup from "../../../components/teacherDashboard/teacherSubjectList/popup.js"

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';




const Subject = () => {
	return <p>Subject</p>
}

export default class TeacherSubjectListPage extends React.Component {

	render() {
		return (
			<Box>
				<Box textAlign="center" my={5}>
					<Typography variant="h4">Subject List</Typography>
				</Box>

				<Box>
					<Popup />
				</Box>

				<Box>
					<SubjectList />
				</Box>
			</Box>
		);
	}
}