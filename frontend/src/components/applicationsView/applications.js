import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15%",
    marginRight: "15%",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fancyCard: {
    flexBasis: "50%",
  },
  card: {
    height: "350px",
    width: "450px",
    backgroundColor: "#2964BA",
    margin: theme.spacing(1),
  },
  cardMedia: {
    height: 0,
    paddingTop: "64%",
  },
  cardLabel: {
    color: "#FFFFFF",
  },
}));


export default function TeacherApplicationsView(props) {
  const classes = useStyles();

  function FancyCard(props) {
    return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image={props.image}
              component={Link}
              to={props.to}
            />
            <CardContent>
              <Typography className={classes.cardLabel} variant="h5">
                {props.label}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.cardContainer}>
        <FancyCard to={`/teacher/subject/${props.subjectId}/class/${props.classId}/video`}
                   image={require("../../images/authentication.jpg")}
                   label="View Facial Authentication" />

        <FancyCard to={`/teacher/subject/${props.subjectId}/class/${props.classId}/attendance`}
                   image={require("../../images/attendance.jpg")}
                   label="View Class Attendance" />

        <FancyCard to={`/teacher/subject/${props.subjectId}/class/${props.classId}/questions`}
                   image={require("../../images/questions.jpg")}
                   label="View Questions" />

        <FancyCard to={`/teacher/subject/${props.subjectId}/class/${props.classId}/location`}
                   image={require("../../images/location.png")}
                   label="View Location Settings" />
      </Box>
    </Box>
  )
}