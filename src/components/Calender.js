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
import { CalendarToday } from "@material-ui/icons";
import { Grid, Link, Paper, Typography } from "@mui/material";
import moment from "moment";

function AppointmentComponent({ children, data, style, ...restProps }) {
  return (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{
        ...style,
        backgroundColor: data.bg,
      }}
    >
      {children}
    </Appointments.Appointment>
  );
}

function ToolTipConent({ appointmentData, ...rest }) {
  return (
    <AppointmentTooltip.Content {...rest} appointmentData={appointmentData}>
      {appointmentData.link && (
        <Grid container alignItems="center">
          <Grid item xs={2} textAlign="center" color="gray">
            <CalendarToday />
          </Grid>
          <Grid item xs={10}>
            <Link href={appointmentData.link} target="_blank" color="#1155ff">
              Add to Google Calender
            </Link>
          </Grid>
        </Grid>
      )}
    </AppointmentTooltip.Content>
  );
}

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

  const defaultView = localStorage.getItem("defaultView") || "Week";
  const onViewChange = (view) => {
    localStorage.setItem("defaultView", view);
  };

  const defaultDate = moment("2022-01-04").isSameOrBefore("2022-01-04")
    ? "2022-01-04"
    : "2022-01-05";

  return (
    <Paper sx={{ backgroundColor: "white" }}>
      <Scheduler data={events}>
        <ViewState
          defaultCurrentDate={defaultDate}
          defaultCurrentViewName={defaultView}
          onCurrentViewNameChange={onViewChange}
        />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={9} endDayHour={18} />
        <Appointments appointmentComponent={AppointmentComponent} />
        <AppointmentTooltip showCloseButton contentComponent={ToolTipConent} />
        <CurrentTimeIndicator />
      </Scheduler>
    </Paper>
  );
}
