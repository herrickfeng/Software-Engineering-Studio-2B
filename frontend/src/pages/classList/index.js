import React from "react";

// project components
// import SubjectList from "../../../components/teacherDashboard/teacherSubjectList/index.js";
// import { AuthContext } from "../../../context/auth";
// import Popup from "../../../components/teacherDashboard/teacherSubjectList/popup.js"
import ClassListTable from "../../components/classList/class-list-table.js";

// material-ui components
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';




const Subject = () => {
	return <text>SES2A</text>
}

export default class classList extends React.Component {

	render() {
		return (
			<Box>
				<Box textAlign="center" my={5}>
					<Typography variant="h4">SES2A Class List</Typography>
				</Box>
				{/* Add classes for styles */}
				<div style={{display:"flex", justifyContent:"center", alignItems: "center"}}> 
					<Button variant="contained" color="primary" startIcon={<AddIcon/>} >
						Add Subject
					</Button>
				</div>
				<ClassListTable/>     
			</Box>
		);
	}
}