import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  header: {
    backgroundColor: "#334dbb",
  },
}));

/**
 * props {
 *   onCodeEntered(code) // A callback to when the code is entered successfully
 *   onClose // A callback to when the popup/dialog should be closed
 *   open // A boolean representing whether or not the dialog/popup should be opened
 *   onCodeChange // A callback to whenever the code changes
 * }
 */
export default function CodePopup(props) {
  const [code, setCode] = useState("");
  const [shouldShowWarning, setShouldShowWarning] = useState(false);
  const classes = useStyles();

  function onEnterClick(event) {
    if (code.length > 0) {

      if (!props.onCodeEntered || props.onCodeEntered(code)) {
        props.onClose();
      }
      setCode("");
    } else {
      setShouldShowWarning(true);
    }
  }

  function onCodeChange(event) {
    setShouldShowWarning(false);
    setCode(event.target.value);

    if (props.onCodeChange) {
      props.onCodeChange(code);
    }
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>

        <DialogTitle className={classes.header}>
          <Typography variant="h5" align="center" className={classes.title}>
            {props.title || "Enter Code"}
          </Typography>
        </DialogTitle>

        <Box mx={2}>
          <TextField autoFocus variant="outlined" margin="normal" fullWidth required onChange={onCodeChange}/>

          {shouldShowWarning ? (
            <Typography color="error">
              please enter a code
            </Typography>
          ) : null}
        </Box>

        <DialogActions>
          <Button onClick={onEnterClick} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}