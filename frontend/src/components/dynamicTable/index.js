import React, { useState } from "react";
import { Table, TableRow, Box, useMediaQuery, useTheme, TableHead, TableBody } from "@material-ui/core";
import DynamicRow from "./DynamicRow";


export default function DynamicTable(props) {

  const headLabels =  React.Children.toArray(props.children)
    .filter(e => e && e.type === TableHead)
    .flatMap(e => e.props.children)
    .filter(e => e && e.type === TableRow)
    .flatMap(e => e.props.children)
    .filter(e => e)
    .map(e => e.props.children);

  const tableChildren = React.Children.toArray(props.children).filter(e => e).map((child, index) => {
    const isHead = child.type === TableHead;

    return (
      <child.type key={index}>
        {React.Children.toArray(child.props.children).filter(e => e).map((rowElement, rowIndex) =>
          <DynamicRow {...rowElement.props} head={isHead} headLabels={headLabels} key={rowIndex}/>
        )}
      </child.type>
    );
  });

  return (
    <Table {...props}>
      {tableChildren}
    </Table>
  );
}