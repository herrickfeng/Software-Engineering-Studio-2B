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
			<Grid>
				<TeacherClassInformationView data={this.state}/>
        <TeacherApplicationsView subjectId={this.props.match.params.subjectId} classId={this.props.match.params.classId}/>
				<Box textAlign="center" my={5}>
					<Button
						variant={"outlined"}
						color={"primary"}
						component={Link}
						to={"/teacher/subjectList/classList"}>

						Back
					</Button>
				</Box>
			</Grid>
			:
			// TODO loading icon spinner
			<h1>Loading</h1>
			)
		);
	}
}