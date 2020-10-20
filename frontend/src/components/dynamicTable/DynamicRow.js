import React, { useState } from "react";
import { TableRow, Box, useMediaQuery, useTheme, Typography, Table, TableCell, TableHead, TableBody, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";


const useStyles = makeStyles(theme => ({
  row: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  hiddenContent: {
    backgroundColor: "#ebebeb",
    width: "100%",
  },
  detailsTable: {
    borderCollapse: "seperate",
  },
  detailsCell: {
    borderBottom: "none",
    fontSize: "9pt",
    fontFamily: "Helvetica",
  },
}));


export default function DynamicRow(props) {
  const theme = useTheme();
  const classes = useStyles();
  const shouldShrink = useMediaQuery(theme.breakpoints.down("sm"));
  const [showExtra, setShowExtra] = useState(shouldShrink);

  const shrinkedColumnCount = 3;
  let allChildren = React.Children.toArray(props.children);
  let children = shouldShrink && allChildren.length > 3 ?
    allChildren.filter(cell => cell && !cell.props.forceHidden).slice(0, (shouldShrink ? shrinkedColumnCount : allChildren.length))
    : allChildren;
  let hiddenChildren = allChildren.filter(e => !children.includes(e));

  function onRowClick(event) {
    setShowExtra(!props.head && !showExtra && shouldShrink);

    if (!shouldShrink && props.onClick) {
      props.onClick(event)
    }
  }

  return (
    <>
      <TableRow onClick={onRowClick} className={clsx((shouldShrink && classes.row), props.className)}>
        {children}
      </TableRow>

      {shouldShrink && showExtra ? (
        <TableRow className={classes.hiddenContent}>
          <TableCell colSpan={shrinkedColumnCount}>
            <Box mx={2} display="flex" justifyContent="space-between">
              <Box>
                <Table size="small" aria-label="details-table" className={classes.detailsTable}>
                  <TableBody>
                    {hiddenChildren.map((hidden) => (
                      <TableRow>
                        <TableCell className={classes.detailsCell}>
                          {props.headLabels[allChildren.indexOf(hidden)]}
                        </TableCell>
                        <TableCell className={classes.detailsCell}>
                          {hidden.props.children}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              {props.onClick ? (
                <Button variant="contained" color="secondary" onClick={props.onClick}>View</Button>
              ) : null}
            </Box>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}