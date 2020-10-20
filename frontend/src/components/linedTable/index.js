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
  leftCell: {
    borderLeft: `${BorderSize} solid black`,
    borderTop: `${BorderSize} solid black`,
    borderBottom: `${BorderSize} solid black`,
  },
  cell: {
    borderTop: `${BorderSize} solid black`,
    borderBottom: `${BorderSize} solid black`,
  },
  rightCell: {
    borderRight: `${BorderSize} solid black`,
    borderTop: `${BorderSize} solid black`,
    borderBottom: `${BorderSize} solid black`,
  },
  headCell: {
    borderBottom: "none",
    fontWeight: "bold",
    fontSize: 22,
  }
}));

export default function LinedTable(props) {
  const classes = useStyles();

  const children = React.Children.toArray(props.children).filter(e => e).map((child) => {
    if (child.type === TableHead) {
      const children = React.Children.toArray(child.props.children).filter(e => e).map((rowElement) =>
        <rowElement.type {...rowElement.props}>
          {React.Children.toArray(rowElement.props.children).filter(e => e).map((cellElement) => {
            return <cellElement.type {...cellElement.props} align={"center"}
                                     className={clsx(cellElement.props.className, classes.headCell)}/>
          })}
        </rowElement.type>
      );

      return (
        <child.type {...props}>
          {children}
        </child.type>
      );
    } else if (child.type === TableBody) {
      const children = React.Children.toArray(child.props.children).filter(e => e).map((rowElement) =>
        <rowElement.type {...rowElement.props}>
          {React.Children.toArray(rowElement.props.children).filter(e => e).map((cellElement, index, arr) => {
            return <cellElement.type {...cellElement.props} align={"center"} className={clsx(
              cellElement.props.className,
              index === 0 && classes.leftCell,
              index === arr.length - 1 && classes.rightCell,
              classes.cell)}/>
          })}
        </rowElement.type>
      );

      return (
        <child.type {...props}>
          {children}
        </child.type>
      );
    } else {
      return child;
    }
  });

  return (
    <Table {...props} className={clsx(props.className, classes.table)}>
      {children}
    </Table>
  )
}