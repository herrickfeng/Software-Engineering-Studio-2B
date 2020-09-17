import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
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

// Styles for each custom card
const useStyles = makeStyles(() => ({
  actionArea: { //When a card is hovered over, the card enlarges
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  card: ({ color }) => ({ //Card styles
    width: 400,
    maxHeight: 500,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => { //Card text background styles
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontSize: '1.4rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#fff',
    marginTop: '.5rem',
    opacity: 0.87,
    fontSize: 14,
  },
    media: { //Important for image to show: sets picture margins
      height: 0,
      paddingTop: '50%',
      marginTop:'30'
    },
    mediaInactive: { //Important for image to show: sets picture margins
      height: 0,
      opacity: .6,
      paddingTop: '50%',
      marginTop:'30'
    }
}));

// Custom card for each Active Card application
const CustomCard = ({ classes, image, title, subtitle, history, url }) => {
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card} onClick={() => history.push(url)}>
        <CardMedia className={classes.media} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

// Custom card for each Inactive Card application
const CustomCardInactive = ({ classes, image, title, subtitle }) => {
  return (
    <Card className={classes.card}>
        <CardMedia className={classes.mediaInactive} image={image} />
        <CardContent className={classes.content}>
            <Typography className={classes.title} variant={'h2'}>
            {title}
            </Typography>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
    </Card>
  );
};

export default function TeacherApplicationsView(props) {
	const gridStyles = useGridStyles();
  const styles = useStyles({ color: '#0f4beb' });
  const stylesInactive = useStyles({ color: '#b2b2b2' });
  const history = useHistory();

    // Grid with container grid for each row (2x2 grid)
	return (
        <Grid>
		    <Grid container classes={gridStyles} my={5} spacing={4} direction="row" wrap={'nowrap'}>
			    <Grid item >
				    <CustomCard
            classes={styles}
            title={'Verify Facial Authentication'}
            subtitle={'Click here to get started!'}
            image={
              "https://security-img.scdn6.secure.raxcdn.com/news/920/digital-barriers-facial-recognition-technology.jpg"
            }
            history={history}
            url={`${props.classId}/video`}
          />
			    </Grid>
                <Grid item >
				    <CustomCard
                        classes={styles}
                        title={'View Class Attendance'}
                        subtitle={'Click here to check out student attendance!'}
                        image={
                            'https://media.istockphoto.com/photos/rear-view-of-large-group-of-students-on-a-class-at-lecture-hall-picture-id1069239598?k=6&m=1069239598&s=612x612&w=0&h=GkYYkDmTqqBYAW3ju6l29eqpIS1e5426oZmVig35Jgc='
                        }
                    />
			    </Grid>
		    </Grid>

            <Grid container classes={gridStyles} my={5} spacing={4} direction="row" wrap={'nowrap'}>
			    <Grid item>
				    <CustomCard
                        classes={styles}
                        title={'View Questions'}
                        subtitle={'Click here to check class questions!'}
                        image={
                            "https://image1.masterfile.com/getImage/NjMyLTAzNDAzMTQ0ZW4uMDAwMDAwMDA=AKsMmL/632-03403144en_Masterfile.jpg"
                        }
                    />
			    </Grid>

                <Grid item>
				    <CustomCardInactive 
                        classes={stylesInactive}
                        title={'View Location Settings'}
                        subtitle={'Coming Soon'}
                        image={
                            "https://www.springwise.com/wp-content/uploads/2019/09/pros-conslocation-tracking.png"
                        }
                    />
			    </Grid>
		    </Grid>
        </Grid>

	)

}