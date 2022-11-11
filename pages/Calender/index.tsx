import { useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRouter } from "next/router"


function Calender() {
  // 日付をクリックしたときの処理
  const handleDateClick = useCallback((arg: DateClickArg) => {
    router.push(arg.dateStr);
  }, []);

  const router = useRouter()
  

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default Calender;