import React, { useState, useEffect } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function TeacherAttendanceVerification(props) {
  const [state, setState] = useState(undefined);

  const onChange = async (e) => {
    setState(e.target.value == "yes")
  }

  return (
    <Container>
      <Grid >
        {/* <FormLabel component="legend">Teacher Attendance Verification</FormLabel> */}
        {!props.completed &&
        <RadioGroup aria-label="gender" name="gender1" onChange={onChange}>
          <FormControlLabel
            value="yes"
            control={<Radio color="primary" />}
            label="Yes"
            labelPlacement="end"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="primary" />}
            label="No"
            labelPlacement="end"
          />
        </RadioGroup>
        }
      </Grid>
      {!props.completed &&
        <Button color="primary" variant="outlined" onClick={() => props.onClick(state) } disabled={state === undefined}>
          Submit
        </Button>
      }
    </Container>
  )
}