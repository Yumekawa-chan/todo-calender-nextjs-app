import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const Calender = () => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
      />
    </div>
  );
}

export default Calender;