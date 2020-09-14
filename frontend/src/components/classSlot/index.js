import React from "react";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ClassSlotOption from "./ClassSlotOption";


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
              16/2/2020
            </Typography>
          </Box>
          <Box>
            <Typography>
              16:00 - 20:00
            </Typography>
          </Box>
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