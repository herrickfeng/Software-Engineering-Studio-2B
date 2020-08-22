import React from "react"
import {Button, TableHead, TableRow, TableCell, TableBody, Box} from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import {Link} from "react-router-dom";

/**
 * An example for what can be passed in via props
 * {
 *   data: // Data containing all the classes which will be displayed
 *   addPath: // Path to another route via react router
 *   backPath: // Path to previous route via react router
 * }
 * @param props
 * @return {React.Component}
 */
export default function ClassList(props) {

  /* TODO there should be some way to pass the data that is fetched from the backend into the props of this component.
   * We should process that here, and pass it into table rows. Hopefully we can do this as soon as we know what the data
   * from the backend will look like which will be soon.
   */

  return (
    <>
      <LinedTable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Class Code</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {new Array(10).fill(
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>2020/8/20</TableCell>
              <TableCell>14:00</TableCell>
              <TableCell>1293491</TableCell>
            </TableRow>)}

        </TableBody>
      </LinedTable>

      <Box my={3} display={"flex"} justifyContent={"space-between"}>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.backPath}>
          Back
        </Button>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.addPath}>
          + Add Class
        </Button>
      </Box>
    </>
  );
}