import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import { Link } from "react-router-dom";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Color from 'color';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


// Grid breaking points for the 2x2 grid of cards
const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));


export default function TeacherApplicationsView(props) {
	const gridStyles = useGridStyles();

    // Grid with container grid for each row (2x2 grid)
	return (
        <Grid>
            <Grid container classes={gridStyles} my={5} spacing={4} direction="row" wrap={'nowrap'}>
                <Grid item >
                    <Card style={{ height: '350px', width: '450px', backgroundColor: '#2964BA'}}>
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 0, paddingTop: '64%' }}
                                image={require("../../images/authentication.jpg")}
                                component={Link}
                                
                            />
                            <CardContent>
                                <Typography style={{ color: '#FFFFFF' }} variant="h5" component="h2">
                                    View Facial Authentication
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item >
                    <Card style={{ height: '350px', width: '450px', backgroundColor: '#2964BA' }}>
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 0, paddingTop: '64%' }}
                                image={require("../../images/attendance.jpg")}
                                component={Link}
                                to={"/teacher/subjectList/classList/applicationsView/teacherClassAttendanceView"}
                            />
                            <CardContent>
                                <Typography style={{ color: '#FFFFFF' }} variant="h5" component="h2">
                                    View Class Attendance
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            <Grid container classes={gridStyles} my={5} spacing={4} direction="row" wrap={'nowrap'}>
                <Grid item>
                    <Card style={{ height: '350px', width: '450px', backgroundColor: '#2964BA' }}>
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 0, paddingTop: '64%' }}
                                image={require("../../images/questions.jpg")}
                                component={Link}
                                to={"/teacher/subjectList/classList/applicationsView/teacherQuestionsView"}
                            />
                            <CardContent>
                                <Typography style={{ color: '#FFFFFF' }} variant="h5" component="h2">
                                    View Questions
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item>
                    <Card style={{ height: '350px', width: '450px', backgroundColor: '#2964BA' }}>
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 0, paddingTop: '64%' }}
                                image={require("../../images/location.png")}
                                component={Link}
                                
                            />
                            <CardContent>
                                <Typography style={{ color: '#FFFFFF' }} variant="h5" component="h2">
                                    View Location Settings
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
	)
}