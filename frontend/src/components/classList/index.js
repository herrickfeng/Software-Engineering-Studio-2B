import React from "react"
import {Button, TableHead, TableRow, TableCell, TableBody, Box} from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import {Link} from "react-router-dom";

/**
 * An example for what can be passed in via props
 * {
 *   data: // Data containing all the classes which will be displayed
 *   onAddClick: // A listener for when add class is clicked
 *   onBackClick: // A listener for when back is clicked
 *   addPath: // Path to another route via react router
 *   backPath: // Path to previous route via react router
 * }
 * @param props
 * @return {React.Component}
 */
export default function ClassList(props) {

  // TODO there should be some way to pass the data that is fetched from the backend into the props of this component.
  // We can then pass it into table rows as shown below.

  let sampleData = [
    {
      name: "Week 1",
      date: "11/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      classCode: 123123,
    },
    {
      name: "Week 2",
      date: "18/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      classCode: 392044,
    },
    {
      name: "Week 3",
      date: "25/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      classCode: 320940,
    },
    {
      name: "Week 4",
      date: "1/1/2020",
      startTime: "12:00",
      endTime: "14:00",
      classCode: 129032,
    },
  ];

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
          {sampleData.map(entry => (
            <TableRow>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.startTime}-{entry.endTime}</TableCell>
              <TableCell>{entry.classCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </LinedTable>

      <Box my={3} display={"flex"} justifyContent={"space-between"}>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.backPath} onClick={props.onBackClick}>
          Back
        </Button>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.addPath} onClick={props.onAddClick}>
          + Add Class
        </Button>
      </Box>
    </>
  );
}