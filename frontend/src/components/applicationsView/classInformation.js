import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment"
import LoadingStatus from "../loadingStatus/index";

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
    props = props.props;
    const styles = useStyles();
    const { authState } = React.useContext(AuthContext);
    const [state, setState] = useState(undefined);


    const fetchData = async () => {
        const subjectId = props.match.params.subjectId;
        const classId = props.match.params.classId;
        const { idToken } = authState.user;
        const subject = (await api.admin.subject.get(idToken, subjectId)).data.data;
        const subjectClass = (await api.admin.subject.class.get(idToken, subjectId, classId)).data.data;
        setState({ subject: subject, class: subjectClass });
    };

    useEffect(() => {
        if (state === undefined) {
            fetchData();
        }
    });

    return (
        (state ?
            <Box textAlign="center" my={5}>
                <Typography className={styles.title}>{state.subject.subjectName}</Typography>
                <Typography className={styles.subtitle}>{state.class.className}</Typography>
                <Typography className={styles.subtext}>Date: {moment(state.class.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                <Typography className={styles.subtext}>Time {state.class.startTime} - {state.class.endTime}</Typography>
                <Typography className={styles.subtext}>Code: {state.class.classCode}</Typography>
            </Box>
            :
            <LoadingStatus />
        )
    )
}