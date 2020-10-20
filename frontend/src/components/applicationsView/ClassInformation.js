import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../loadingSpinner"
import moment from "moment"


const useStyles = makeStyles((theme) => ({
    title: {
        color: "#FFFFFF",
        fontSize: 40,
    },
    subtitle: {
        color: "#FFFFFF",
        fontSize: 24,
    },
    subtext: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    subjectCard: {
        [theme.breakpoints.up("md")]: {
            width: "930px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        backgroundColor: "#1A4B93",
    },
    classCard: {
        width: "400px",
        backgroundColor: "#848F9F",
    },
    datetimeCard: {
        width: "400px",
        backgroundColor: "#848F9F",
    },
}));


export default function ClassInformation(props) {
    props = props.props;
    const classes = useStyles();
    const { authState } = React.useContext(AuthContext);
    const [state, setState] = useState(undefined);


    const fetchData = async () => {
        const subjectId = props.match.params.subjectId;
        const classId = props.match.params.classId;
        const { idToken } = authState.user;
        const subject = authState.user.claims.teacher ? 
            (await api.admin.subject.get(idToken, subjectId)).data.data:
            (await api.subject.get(idToken, subjectId)).data.data;
        const subjectClass = authState.user.claims.teacher ? 
            (await api.admin.subject.class.get(idToken, subjectId, classId)).data.data:
            (await api.subject.class.get(idToken, subjectId, classId)).data.data;
        setState({ subject: subject, class: subjectClass });
    };

    useEffect(() => {
        if (state === undefined) {
            fetchData();
        }
    });

    return (
        (state ?
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                    <Card paper className={classes.subjectCard}>
                        <Box textAlign="center" my={2}>
                            <Typography className={classes.title}>{state.subject.subjectName}</Typography>
                        </Box>
                    </Card>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" my={1} flexWrap="wrap">
                    <Box textAlign="center" mx={2} my={1}>
                        <Card paper className={classes.classCard}>
                            <Box textAlign="center" my={3}>
                                <Typography className={classes.subtitle}>{state.class.className}</Typography>
                            </Box>
                        </Card>
                    </Box>
                    <Box textAlign="center" mx={2} my={1}>
                        <Card paper className={classes.datetimeCard}>
                            <Box textAlign="center" my={1.5}>
                                <Typography className={classes.subtext}>Date: {moment(state.class.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                                <Typography className={classes.subtext}>Time {state.class.startTime} - {state.class.endTime}</Typography>
                                <Typography className={classes.subtext}>Code: {state.class.classCode}</Typography>
                            </Box>
                        </Card>
                    </Box>
                </Box >
            </Box>:
            <div>
              <LoadingSpinner />
            </div>
        )
    )
}