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
      name: "Week 1",
      date: "11/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      code: 123123,
    },
    {
      name: "Week 2",
      date: "18/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      code: 392044,
    },
    {
      name: "Week 3",
      date: "25/8/2020",
      startTime: "12:00",
      endTime: "14:00",
      code: 320940,
    },
    {
      name: "Week 4",
      date: "1/1/2020",
      startTime: "12:00",
      endTime: "14:00",
      code: 129032,
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
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.startTime}-{entry.endTime}</TableCell>
              <TableCell>{entry.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </LinedTable>
    </>
  );
}