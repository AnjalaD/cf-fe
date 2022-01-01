import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function Calender({ events, showData }) {
  return (
    <div className="w-100 bg-white" style={{ position: "relative" }}>
      {(!showData || events.lenght === 0) && (
        <div
          className="w-100 h-100 bg-dark"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1000 }}
        >
          <p
            className="text-white text-center w-100"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              zIndex: 1000,
            }}
          >
            {!showData ? "Please select an option" : "No events"}
          </p>
        </div>
      )}
      <FullCalendar
        nowIndicator
        defaultView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,timeGridDay,listDay",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={events}
        visibleRange={{
          start: "2022-01-04",
          end: "2022-01-05",
        }}
        initialView="timeGridDay"
        initialDate="2022-01-04"
        themeSystem="bootstrap"
      />
    </div>
  );
}
