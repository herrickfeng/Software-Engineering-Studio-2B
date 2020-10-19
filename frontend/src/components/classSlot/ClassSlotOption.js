import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import clsx from "clsx";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
  bigFlatButton: {
    padding: theme.spacing(10),
    margin: theme.spacing(2),
    maxWidth: theme.spacing(40),
    maxHeight: theme.spacing(30),
  },
  completed: {
    borderColor: "green",
    color: "green",
  },
  incompleted: {
    borderColor: "red",
    color: "red",
  },
}));

export default function ClassSlotOption(props) {
  const classes = useStyles();
  const { completed, incompleted, ...otherProps } = props;

  let colorClass = null;

  if (completed) {
    colorClass = classes.completed
  } else { //if (incompleted) { // Commented out so can set completed as a boolean and ignore incompleted variable
    colorClass = classes.incompleted
  }

  return (
    <Button variant="outlined" onClick={props.handleClick} className={clsx(classes.bigFlatButton, props.className, colorClass)} {...otherProps}>
      <Box m={1}>
        {completed ? <DoneIcon/> : <CloseIcon/>}
        {/* {incompleted ? <CloseIcon/> : null}  // Commented out so can set completed as a boolean */}
      </Box>

      <Box>
        {props.children}
      </Box>
    </Button>
  );
}