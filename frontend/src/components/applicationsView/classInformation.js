import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../loadingSpinner"
import moment from "moment"

const useStyles = makeStyles(() => ({
    title: {
        color: '#FFFFFF',
        fontSize: 40,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    subtext: {
        color: '#FFFFFF',
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
            <Box>
                <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                    <Card paper style={{ height: '80px', width: '930px', backgroundColor: '#1A4B93' }}>
                        <Box textAlign="center" my={2}>
                            <Typography className={styles.title}>{state.subject.subjectName}</Typography>
                        </Box>
                    </Card>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" my={2} >
                    <Box textAlign="center" mx={2}>
                        <Card paper style={{ height: '80px', width: '450px', backgroundColor: '#848F9F' }}>
                            <Box textAlign="center" my={3}>
                                <Typography className={styles.subtitle}>{state.class.className}</Typography>
                            </Box>
                        </Card>
                    </Box>
                    <Box textAlign="center" mx={2}>
                        <Card paper style={{ height: '80px', width: '450px', backgroundColor: '#848F9F' }}>
                            <Box textAlign="center" my={1.5}>
                                <Typography className={styles.subtext}>Date: {moment(state.class.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                                <Typography className={styles.subtext}>Time {state.class.startTime} - {state.class.endTime}</Typography>
                                <Typography className={styles.subtext}>Code: {state.class.classCode}</Typography>
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