import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  center: {
    margin: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));


export default function LoadingStatus(props) {
  const classes = useStyles();

  return (
    <Box className={classes.center}>
      <CircularProgress />
    </Box>
  );
}