import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  Toolbar,
  CurrentTimeIndicator,
  ViewSwitcher,
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
        <ViewState
          defaultCurrentDate="2022-01-04"
          defaultCurrentViewName="Day"
        />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <DayView startDayHour={8} endDayHour={18} />
        <WeekView startDayHour={8} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip showCloseButton />
        <CurrentTimeIndicator />
      </Scheduler>
    </Paper>
  );
}
