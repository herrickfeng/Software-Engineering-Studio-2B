import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment"

const useStyles = makeStyles((theme) => ({
  future: {
    color: "black",
    fontWeight: "bold"
  },
  past: {
    color: "green"
  },
}));

export default function FormatDate(props) {
  const classes = useStyles();
  const date = props.date;
  // if (moment(date).isAfter(moment(), 'day')) {
  //   return <div>{moment(date, "YYYY-MM-DD").format("dddd MMMM Do YYYY")}</div>
  // }
  // if (moment(date).isBefore(moment(), 'day')) {
  //   return <div className={classes.past}>{moment(date, "YYYY-MM-DD").format("dddd MMMM Do YYYY")}</div>
  // }
  return <div className={classes.future}>{moment(date, "YYYY-MM-DD").format("dddd MMMM Do YYYY")}</div>
}