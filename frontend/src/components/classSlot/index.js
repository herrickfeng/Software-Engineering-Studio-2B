import React from "react";
import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClassSlotOption from "./ClassSlotOption";
import moment from "moment"
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  options: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

/**
 * A generic component for displaying class information. You can also specify actions that can be performed
 * for the given class using {@link ClassSlotOption}.
 *
 * props {
 *   class // A model representing the class which is used to display information
 * }
 *
 * @example
 * <ClassView>
 *   <ClassSlotOption>
 *     Attend Class
 *   </ClassSlotOption
 * </ClassView>
 *
 * <ClassView>
 *   <ClassSlotOption completed onClick={(e) => console.log("YAY")}>
 *     Attend Class
 *   </ClassSlotOption>
 * </ClassView>
 */
export default function ClassSlot(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <Box mt={5}>
        <Typography variant="h4">{props.data.subject.subjectName}</Typography>
      </Box>

      <Box display="flex" flexDirection="row">

        <Box m={2}>
          <Box>
            <Typography>
              {props.data.class.className}
            </Typography>
          </Box>
          <Box>
            <Typography>
              {moment(props.data.class.date, "YYYY-MM-DD").format("dddd MMMM Do YYYY")}
            </Typography>
          </Box>
          <Box>
            <Typography>
            {moment(props.data.class.startTime, "hh:mm").format('LT')} - {moment(props.data.class.endTime, "hh:mm").format('LT')}
            </Typography>
          </Box>
          <br/>
          <Grid >
          <FormLabel component="legend">Teacher Attendance Verification</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
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
          </Grid>
          <Button color="primary" variant="outlined">
            Submit
          </Button>
        </Box>

        <Box m={2}>
          <Typography>
            {props.data.class.classCode}
          </Typography>
        </Box>
      </Box>

      {React.Children.count(props.children) > 0 ? (
        <Box my={5} className={classes.options}>
          {React.Children.map(props.children, (comp) => comp.type === ClassSlotOption ? comp : null)}
        </Box>
      ) : null}
    </Box>
  );
}