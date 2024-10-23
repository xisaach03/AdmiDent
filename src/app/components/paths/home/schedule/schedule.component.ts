import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CommonModule } from '@angular/common';
interface Event {
  title: string;
  start: string;
  end?: string;
  color: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FullCalendarModule,CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  selectedDate: Date = new Date();  
  dailyEvents: Event[] = []; 

  events: Event[] = [
    { title: 'Europe tour', start: '2024-09-29T00:00:00', end: '2024-09-24', color: 'green' },
    { title: 'Business of Software Conference', start: '2024-09-23T07:00:00', color: 'red' },
    { title: 'Product team mtg.', start: '2024-09-29T07:00:00', color: 'purple' },
    { title: 'Board meeting', start: '2024-09-23T08:00:00', color: 'yellow' },
    { title: 'Lunch @ Butcher\'s', start: '2024-09-23T12:00:00', color: 'blue' },
    { title: 'Status Update Meeting', start: '2024-09-23T14:00:00', color: 'orange' },
    { title: 'Clever Conference', start: '2024-09-23T16:00:00', color: 'red' },
    { title: 'Pizza Night', start: '2024-09-29T18:00:00', color: 'green' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], 
    initialView: 'dayGridMonth', 
    events: this.events,
    dateClick: this.handleDateClick.bind(this) 
  };

  handleDateClick(arg: any) {
    this.selectedDate = new Date(arg.dateStr);
    this.filterEventsByDay();
  }

  filterEventsByDay() {
    const today = this.selectedDate;
    this.dailyEvents = this.events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()
      );
    }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }

  ngOnInit() {
    this.filterEventsByDay(); // Cargar eventos al iniciar el componente
  }
}
