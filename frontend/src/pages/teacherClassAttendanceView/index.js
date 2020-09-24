import React from "react";
import { Link } from "react-router-dom";

// project components
import { AuthContext } from "../../context/auth";
import StudentAttendanceStatusView from "../../components/classAttendance/studentAttendanceStatusView.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


export default class TeacherClassAttendanceView extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined;
	}

	async componentDidMount() {
		const subjectId = this.props.match.params.subjectId;
		const classId = this.props.match.params.classId;
		const { idToken } = this.context.authState.user;
    const subject = (await api.admin.subject.get(idToken, subjectId)).data.data;
    const subjectClass = (await api.admin.subject.class.get(idToken, subjectId, classId)).data.data;
		this.setState({subject: subject, class: subjectClass});
	}

	render() {
		return (
			(this.state ?
			<Grid container direction="column">
				<TeacherClassInformationView data={this.state} />

				<StudentAttendanceStatusView/>

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					<Box mx={2}>
						<Button
							variant="outlined"
							color="primary"
							component={Link}
							to={"/teacher/subjectList/classList/applicationsView"}>
							Back
						</Button>
					</Box>
					<Box mx={2}>
						<Button variant="outlined" color="primary">
							Export
						</Button>
					</Box>
					<Box mx={2}>
						<Button variant="outlined"
							color="secondary"
							component={Link}
							to={"/teacher/subjectList/classList/applicationsView/TeacherClassAttendanceEdit"}>
							Edit
						</Button>
					</Box>
				</Box>
			</Grid>
			:
			// TODO loading icon spinner
			<h1>Loading</h1>
			)
		);
	}
}