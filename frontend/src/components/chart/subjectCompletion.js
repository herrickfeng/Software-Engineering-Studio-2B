import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Stack,
  Animation,
} from "@devexpress/dx-react-chart";

const useStyles = makeStyles({
  chart: {
    height: "2px"
  }
});

class SubjectCompletion extends React.PureComponent {

  constructor(props) {
    super(props);
    const data = [props.data]
    this.state = {
      data: data
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart height="25" data={chartData} rotated>
          <BarSeries
            color="green"
            barWidth="25"
            name="completed"
            valueField="completed"
            argumentField="subjectId"
          />
          <BarSeries
            color="white"
            barWidth="25"
            name="awaiting"
            valueField="awaiting"
            argumentField="subjectId"
          />
          <Animation />
          <Stack
            stacks={[
              {
                series: [
                  "completed",
                  "awaiting"
                ]
              }
            ]}
          />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(SubjectCompletion);