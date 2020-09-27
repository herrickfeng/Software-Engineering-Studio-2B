import React from "react";
import { Link } from "react-router-dom";
import api from "../../helpers/api";

// project components
import { AuthContext } from "../../context/auth";
import StudentAttendanceStatusEdit from "../../components/classAttendance/studentAttendanceStatusEdit.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"
import TeacherAddStudentPopup from "../../components/classAttendance/teacherAddStudentPopup.js"


// material-ui components
import { Box, Button, Grid } from "@material-ui/core";


export default class TeacherClassAttendanceEdit extends React.Component {

	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined;
	}
	/*
	async componentDidMount() {
		const { idToken } = this.context.authState.user;
		const students = (await api.admin.student.getAll(idToken)).data.data;
		this.setState({ students });
	}

	deleteStudent = async (subjectId) => {
		const { idToken } = this.context.authState.user;
		await api.admin.student.delete(idToken, subjectId);
		this.setState({ students: this.state.students.filter((subject) => student.studentId !== studentId) });
	}

	addStudent = async (studentData) => {
		const { idToken } = this.context.authState.user;
		const student = (await api.admin.student.create(idToken, studentData)).data.data;
		console.log(student)
		this.state.students.push(student);
		this.setState({ students: this.state.students });
	}*/

	render() {
		return (
			<Grid container direction="column">
				<TeacherClassInformationView props={this.props} />

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					
					<TeacherAddStudentPopup addSubject={this.addSubject} />
				</Box>

				<StudentAttendanceStatusEdit/>

				<Box my={2} display="flex" justifyContent="center" alignItems="center">
					<Box mx={2}>
						<Button
							variant="outlined"
							color="primary"
							component={Link}
							to={`/teacher/subject/${this.props.match.params.subjectId}/class/${this.props.match.params.classId}`}>
							Back
						</Button>
					</Box>

					<Box mx={2}>
						<Button
							variant="outlined"
							color="secondary"
							component={Link}
							to={"/teacher/subjectList/classList/applicationsView/TeacherClassAttendanceView"}>
							Save
						</Button>
					</Box>
				</Box>
			</Grid>
		);
	}
}