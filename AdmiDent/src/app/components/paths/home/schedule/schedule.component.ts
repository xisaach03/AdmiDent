import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importar desde @fullcalendar/core
import dayGridPlugin from '@fullcalendar/daygrid'; // Importar el plugin para vista de cuadrícula diaria
import interactionPlugin from '@fullcalendar/interaction'; // Importar el plugin para interacciones
import { FullCalendarModule } from '@fullcalendar/angular'; // Importar FullCalendarModule

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports : [FullCalendarModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin], // Registrar plugins
    initialView: 'dayGridMonth', // Vista inicial
    events: [
      { title: 'Evento 1', date: '2024-09-28' },
      { title: 'Evento 2', date: '2024-09-29' }
    ],
    dateClick: this.handleDateClick.bind(this) // Manejar el clic en una fecha
  };

  handleDateClick(arg: any) {
    alert('Fecha: ' + arg.dateStr);
  }
}
