import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SubjectCompletion from "../../components/chart/subjectCompletion"
import LoadingSpinner from "../loadingSpinner";

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
	var subjectState = props.subjectState;
	var deleteSubject = props.deleteSubject;
	const history = useHistory();

	const subjectCard = (subject) => {
		return (
			<Box my={5}>
				<Card onClick={() => history.push(`/teacher/subject/${subject.subjectId}`)}>
					<CardActionArea>
						<CardMedia
							image="/download/picture.jpg"
							title="Teacher Subject"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{`${subject.subjectCode} ${subject.subjectName}`}
							</Typography>
						</CardContent>
						{subjectState.subjectAnalytics && subjectState.subjectAnalytics[subject.subjectId] &&
							(
								<SubjectCompletion data={subjectState.subjectAnalytics[subject.subjectId]} />
							)
						}
					</CardActionArea>
				</Card>
			</Box>
		)
	}

	return (
		<Container maxWidth="md">
			{subjectState ? (
				subjectState.subjects.map((subject) => {
					return subjectCard(subject);
				})
			) : (
					<LoadingSpinner/>
				)}
		</Container>
	);
}