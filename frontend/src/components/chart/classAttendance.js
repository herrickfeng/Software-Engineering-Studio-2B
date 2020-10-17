import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  AreaSeries,
  ArgumentAxis
} from "@devexpress/dx-react-chart-material-ui";
import {
  Stack,
  Animation,
} from "@devexpress/dx-react-chart";
import { stackOffsetExpand } from 'd3-shape';
class ClassAttendance extends React.PureComponent {

  constructor(props) {
    super(props);
    const data = props.data
    this.state = {
      data: data
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart height="150" data={chartData}>
          <ArgumentAxis/>
          <AreaSeries
            color="green"
            name="4"
            valueField="4"
            argumentField="className"
          />
          <AreaSeries
            color="#34a853"
            name="3"
            valueField="3"
            argumentField="className"
          />
          <AreaSeries
            color="#f78800"
            name="2"
            valueField="2"
            argumentField="className"
          />
          <AreaSeries
            color="#f76700"
            name="1"
            valueField="1"
            argumentField="className"
          />
          <AreaSeries
            color="red"
            name="0"
            valueField="0"
            argumentField="className"
          />
          <Animation />
          <Stack offset={stackOffsetExpand} 
            stacks={[
              {
                series: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                ]
              }
            ]}
          />
        </Chart>
      </Paper>
    );
  }
}

export default (ClassAttendance);