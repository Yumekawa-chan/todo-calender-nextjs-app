import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calender() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
      />
    </div>
  );
}