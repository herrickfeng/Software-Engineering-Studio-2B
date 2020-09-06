import React from "react";

// project components
import { AuthContext } from "../../context/auth";
import StudentAttendanceStatus from "../../components/classAttendanceView/studentAttendanceStatus.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


export default class TeacherClassAttendanceView extends React.Component {

	render() {
		return (
			<Grid container direction="column">
				<TeacherClassInformationView />

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					<Button variant="outlined" color="primary">
						Mark Manually
					</Button>
				</Box>

				<StudentAttendanceStatus/>

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					<Box mx={2}>
						<Button variant="outlined" color="primary">
							Back
						</Button>
					</Box>
					<Box mx={2}>
						<Button variant="outlined" color="primary">
							Export
						</Button>
					</Box>
					<Box mx={2}>
						<Button variant="outlined" color="secondary">
							Edit
						</Button>
					</Box>
				</Box>
			</Grid>
		);
	}
}