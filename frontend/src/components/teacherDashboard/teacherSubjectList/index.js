import React, { useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function TeacherSubjectList(props) {
	const [subjectState, setSubjectState] = React.useState(undefined);
	const { authState } = React.useContext(AuthContext);

	useEffect(() => {
		if (subjectState === undefined) {
			fetchSubjectList();
		}
	});

	const fetchSubjectList = async () => {
		const res = await api.admin.subject.getAll(authState.user.idToken);
		setSubjectState(res.data.data);
		console.log(subjectState);
	};

	const deleteSubject = async (subjectId) => {
		await api.admin.subject.delete(authState.user.idToken, subjectId);
		setSubjectState(subjectState.filter((subject) => subject.subjectId != subjectId));
	}

	const subjectCard = (subject) => {
		return (
			<Box my={5}>
				<Card >
					<CardActionArea>
						<CardMedia
							image="/download/picture.jpg"
							title="Teacher Subject"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{`${subject.subjectCode} ${subject.subjectName}`}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								This is a safe space. {subject.subjectId}
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions>
						<Button size="small" color="primary" onClick={() => deleteSubject(subject.subjectId)}>
							Delete
					</Button>
					</CardActions>
				</Card>
			</Box>
		)
	}

	return (
		<Container maxWidth="md">
			{subjectState === undefined ? (
				// TODO Loading spinner
				<h1>Loading</h1>
			) : (
					subjectState.map((subject) => {
						return subjectCard(subject);
					})
				)}


		</Container>
	);
}