import React from "react"
import { Button, TableHead, TableRow, TableCell, TableBody, Box } from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import { Link } from "react-router-dom";

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
export default function StudentProfile(props) {
  let sampleData = [props.profileState]

  // let sampleData = [
  //   {
  //     name: "Peter Pan",
  //     id: "12345678",
  //     email: "hsu.myat.win@uts.edu.au",
  //     password: "*********",
  //   }
  // ];

  return (
    <>
      <LinedTable>
        <TableBody>
          {sampleData.map(entry => (
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell>{entry.displayName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {sampleData.map(entry => (
            <TableRow>
              <TableCell>Student ID:</TableCell>
              <TableCell>{entry.uid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {sampleData.map(entry => (
            <TableRow>
              <TableCell>Email Address:</TableCell>
              <TableCell>{entry.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {sampleData.map(entry => (
            <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={props.handleResetPassword} >Email Reset Link</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </LinedTable>

      {/* <Box my={3} display={"flex"} justifyContent={"space-between"}>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.backPath} onClick={props.onBackClick}>
          Back
        </Button>
        <Button variant={"outlined"} color={"primary"} component={Link} to={props.addPath} onClick={props.onAddClick}>
          Edit
        </Button>
      </Box> */}
    </>
  );
}