import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LoadingSpinner from "../loadingSpinner";

/**
 * A generic component that displays subjects
 *
 * An example for what can be passed in via props
 * {
 *   data: // Data containing all the subjects which will be displayed
 *   onDeleteSubjectClick: // If a function is given, the subject card would have a delete button that calls the given function
 *   onSubjectClick: // A listener with an argument of subject that will be called when a subject card is clicked
 * }
 */
export default function SubjectList(props) {

  function subjectCard(subject) {
    return (
      <Box my={2} key={subject.subjectCode} onClick={() => {props.onSubjectClick(subject)}}>
        <Card>
          <CardActionArea>
            <CardMedia
              image="/download/picture.jpg"
              title="Subject"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {subject.subjectCode} {subject.subjectName}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary">
                This is a safe space. {subject.subjectId}
              </Typography> */}
            </CardContent>
          </CardActionArea>
              {/* TODO: Delete button */}
          {/* {props.onDeleteSubjectClick ? (
            <CardActions>
              <Button size="small" color="primary" onClick={() => props.onDeleteSubjectClick(subject)}>
                Delete
              </Button>
            </CardActions>
          ) : null} */}

        </Card>
      </Box>
    )
  }

  return (
    <Container maxWidth="md">
      {!props.data ? (
        <LoadingSpinner/>
      ) : (
        props.data.map((subject) => {
          return subjectCard(subject);
        })
      )}
    </Container>
  );
}