import React from "react";
import {Table, TableBody, TableHead} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const BorderSize = "2px";

const useStyles = makeStyles((theme) => ({
  table: {
    borderSpacing: "0 10px",
    borderCollapse: "separate",
  },
  cell: {
    borderTop: `${BorderSize} solid black`,
    borderBottom: `${BorderSize} solid black`,
    "&:first-child": {
      borderLeft: `${BorderSize} solid black`,
    },
    "&:last-child": {
      borderRight: `${BorderSize} solid black`,
    },
  },
  headCell: {
    borderBottom: "none",
    fontWeight: "bold",
    fontSize: 22,
  }
}));

export default function LinedTable(props) {
  const classes = useStyles();

  const children = React.Children.toArray(props.children).filter(e => e).map((child, index, arr) => {
    let innerChildren = React.Children.toArray(child.props.children).filter(e => e).map((rowElement, rowIndex) =>
      <rowElement.type {...rowElement.props} key={rowIndex}>
        {React.Children.toArray(rowElement.props.children).filter(e => e).map((cellElement, cellIndex) => {
          return <cellElement.type {...cellElement.props} align={"center"} key={cellIndex} className={clsx(
            cellElement.props.className,
            child.type === TableBody && classes.cell,
            child.type === TableHead && classes.headCell)}/>
        })}
      </rowElement.type>
    );

    return (
      <child.type>
        {innerChildren}
      </child.type>
    );
  });

  return (
    <Table {...props} className={clsx(props.className, classes.table)}>
      {children}
    </Table>
  );
}