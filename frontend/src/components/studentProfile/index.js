import React from "react"
import { Button, TableHead, TableRow, TableCell, TableBody, Box } from "@material-ui/core";
import LinedTable from "../../components/linedTable/index";
import { Link } from "react-router-dom";
import UploadImageForm from "../../components/upload"; 
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
>
      <Typography variant="h4" gutterBottom>
          Profile
      </Typography>
      <img src={sampleData[0].image} height="200vh" objectFit="contain" />
      <Typography variant="subtitle1" gutterBottom>
          Profile picture
      </Typography>
    </Grid>
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
              <TableCell>{entry.studentId}</TableCell>
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
                **********
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
            <TableRow>
            <TableCell align="left">
              Profile Picture
            </TableCell>
            <TableCell>
              <UploadImageForm setState={props.setState}/>
              </TableCell>
            </TableRow>
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