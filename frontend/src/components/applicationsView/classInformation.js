import React, { useEffect } from "react";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


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
            <Typography className={styles.title}>Software Engineering Studio 2B 41096</Typography>
		    <Typography className={styles.subtitle}>Week 3</Typography>
            <Typography className={styles.subtext}>Date: 16/08/2020</Typography>
            <Typography className={styles.subtext}>Time 12:00-14:00</Typography>
            <Typography className={styles.subtext}>Code: 28192</Typography>
		</Box>
    )
}