import React from "react";

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

	return (
		<Container maxWidth="md">
			<Box my={5}>
				<Card >
					<CardActionArea>
						<CardMedia
							image="/download/picture.jpg"
							title="Teacher Subject"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
							Software Engineering Studio 2A 41095
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
							This is a safe space.
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions>
						<Button size="small" color="primary">
							Open
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Container>
	);
}