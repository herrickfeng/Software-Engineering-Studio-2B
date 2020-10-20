import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@material-ui/core";


export default function ProblemRecovery(props) {

  return (
    <Container maxWidth="md">
      <Box my={1} mt={6} fontWeight="fontWeightBold">
        <Typography variant="h2">
          {props.title || "Whoops.."}
        </Typography>
      </Box>
      <Box my={1} mb={6}>
        <Typography variant="subtitle1">
          {props.description}
        </Typography>
      </Box>

      <Box display="flex">
        {props.to ? (
          <Box my={3} mx={1}>
            <Button variant="contained" color="primary" component={Link} to={props.to}>
              {props.toText || "Back"}
            </Button>
          </Box>
        ) : null}
        {props.onAcceptClick ? (
          <Box my={3} mx={1}>
            <Button variant="contained" color="primary" onClick={props.onAcceptClick}>
              {props.acceptText || "Ok"}
            </Button>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}