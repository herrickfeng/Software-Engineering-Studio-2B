import React from "react"
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";

/**
 * An example for what can be passed in via props
 * props {
 *   data // Data containing all the classes which will be displayed
 *   onRowClick(event, entry) // A callback to when a row is clicked by the user
 * }
 */
export default function ClassList(props) {

  // TODO there should be some way to pass the data that is fetched from the backend into the props of this component.
  // We can then pass it into table rows as shown below.

  let sampleData = [
    {
      className: "Week 1",
      date: "11/8/2020",
      classTime: "12:00",
      endTime: "14:00",
      classCode: 123123,
    },
    {
      className: "Week 2",
      date: "18/8/2020",
      classTime: "12:00",
      endTime: "14:00",
      classCode: 392044,
    },
    {
      className: "Week 3",
      date: "25/8/2020",
      classTime: "12:00",
      endTime: "14:00",
      classCode: 320940,
    },
    {
      className: "Week 4",
      date: "1/1/2020",
      classTime: "12:00",
      endTime: "14:00",
      classCode: 129032,
    },
  ];

  let data = props.data || sampleData;

  function onRowClick(event, entry) {
    // Hopefully do something with the given entry and pass it to the next page
    if (props.onRowClick) {
      props.onRowClick(event, entry);
    }
  }

  console.log(onRowClick);

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
          {data.map(entry => (
            <TableRow key={entry.code}
              onClick={(e) => onRowClick(e, entry)} hover={props.onRowClick !== undefined}>
              <TableCell>{entry.className}</TableCell>
              <TableCell>{entry.classId}</TableCell>
              <TableCell>{entry.startTime}-{entry.endTime}</TableCell>
              <TableCell>{entry.classCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </LinedTable>
    </>
  );
}