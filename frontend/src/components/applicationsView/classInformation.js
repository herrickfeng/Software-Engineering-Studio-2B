import React, { useEffect } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment"

const useStyles = makeStyles(() => ({
    title: {

        fontSize: 40,
    },
    subtitle: {
        fontSize: 24,
    },
    subtext: {
        fontSize: 14,
    },
}));


export default function TeacherApplicationsView(props) {
    const styles = useStyles();

    return (
        <Box textAlign="center" my={5}>
            <Typography className={styles.title}>{props.data.subject.subjectName}</Typography>
            <Typography className={styles.subtitle}>{props.data.class.className}</Typography>
            <Typography className={styles.subtext}>Date: {moment(props.data.class.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
            <Typography className={styles.subtext}>Time {props.data.class.startTime} - {props.data.class.endTime}</Typography>
            <Typography className={styles.subtext}>Code: {props.data.class.classCode}</Typography>
        </Box>
    )
}