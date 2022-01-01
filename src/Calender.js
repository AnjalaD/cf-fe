import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  DateNavigator,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper, Typography } from "@mui/material";

export default function Calender({ events, showData }) {
  if (!showData || events.lenght === 0) {
    return (
      <Paper sx={{ py: 8, backgroundColor: "white", color: "black" }}>
        <Typography variant="body1" align="center">
          <i>{!showData ? "Please select an option" : "No events"}</i>
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper sx={{ backgroundColor: "white" }}>
      <Scheduler data={events}>
        <ViewState defaultCurrentDate="2022-01-04" />
        <Toolbar />
        <DateNavigator />
        <DayView startDayHour={8} endDayHour={18} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}
