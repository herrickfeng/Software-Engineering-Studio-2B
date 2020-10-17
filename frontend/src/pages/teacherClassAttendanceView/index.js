import React from "react";
import { Link, Location } from "react-router-dom";
import api from "../../helpers/api"

// project components
import { AuthContext } from "../../context/auth";
import StudentAttendanceStatusView from "../../components/classAttendance/studentAttendanceStatusView.js"
import TeacherClassInformationView from "../../components/applicationsView/classInformation.js"

// material-ui components
import { Box, Button, Grid } from "@material-ui/core";
import LoadingStatus from "../../components/loadingStatus/index";


export default class TeacherClassAttendanceView extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = undefined;
		this.subjectId = props.match.params.subjectId;
		this.classId = props.match.params.classId;
	}

	async componentDidMount() {
		const subjectId = this.props.match.params.subjectId;
		const classId = this.props.match.params.classId;
		const { idToken } = this.context.authState.user;

		const attendances = (await api.subject.attend.getByCl(idToken, subjectId, classId)).data.data;
		this.setState({ attendances: attendances, disabled: true });
	}

	handleDelete = (uid) => {
		const attendances = this.state.attendances.filter((a) => a.uid !== uid);
		this.setState({ ...this.state, attendances: attendances });
	}

	handleEdit = () => {
		this.setState({ ...this.state, disabled: !this.state.disabled });
	}

	handleAttendanceChange = async (e, data) => {
		const attendances = this.state.attendances.map((attendance)=>{
			if (attendance.uid === data.uid) {
				attendance[e.target.name] = !attendance[e.target.name]
			}
			return attendance
		})
		this.setState({ ...this.state, attendances: attendances });
		const { idToken } = this.context.authState.user;
		await api.subject.attend.update(idToken, data.subjectId, data.classId, data.uid, data);
	};

	render() {
		return (
			(this.state ?
				<Grid container direction="column">
					<TeacherClassInformationView props={this.props} />

					<StudentAttendanceStatusView attendances={this.state}  disabled={this.state.disabled} handleAttendanceChange={this.handleAttendanceChange} handleDelete={this.handleDelete}/>

					<Box my={2} display="flex" justifyContent="center" alignItems="center">
						<Box mx={2}>
							<Button
								variant="outlined"
								color="primary"
								component={Link}
								to={`/teacher/subject/${this.subjectId}/class/${this.classId}`}>
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
								onClick={this.handleEdit}>
								{this.state.disabled ? "Edit" : "Save"}
						</Button>
						</Box>
					</Box>
				</Grid>
				:
				<LoadingStatus />
			)
		);
	}
}