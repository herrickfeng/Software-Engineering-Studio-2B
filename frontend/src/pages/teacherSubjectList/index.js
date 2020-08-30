import React from "react";

// project components
import { AuthContext } from "../../context/auth";
import SubjectList from "../../components/subjectList/subject.js";
import Popup from "../../components/subjectList/popup.js"

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
				
				<Popup />
				<SubjectList />
				
			</Box>
		);
	}
}