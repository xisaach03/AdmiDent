import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';

// Interfaz para un tratamiento
interface Treatment {
  treatment: string;  // Nombre del tratamiento
  date: string;  // Fecha del tratamiento
}

// Interfaz para la respuesta del cliente
interface ClientResponse {
  firstName: string;
  lastName: string;
  Treatments: Treatment[]; // Array de tratamientos
  [key: string]: any; // Otros campos
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  selectedDate: Date = new Date(); // Fecha seleccionada por el usuario
  dailyEvents: { title: string; start: string }[] = []; // Eventos filtrados por día
  events: { title: string; start: string }[] = []; // Todos los eventos del calendario

  constructor(private clientService: ClientService) {}

  // Opciones del calendario
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    events: () => this.events, // Asegura que los datos se actualicen dinámicamente
    dateClick: this.handleDateClick.bind(this),
    timeZone: 'local',
    eventContent: this.customEventContent, // Personalizar el contenido del evento
  };

  // Manejar clics en una fecha del calendario
  handleDateClick(arg: any) {
    this.selectedDate = new Date(arg.dateStr);
    this.filterEventsByDay(); // Filtra los eventos para la nueva fecha seleccionada
  }

  // Filtrar los tratamientos para el día seleccionado
  filterEventsByDay() {
    const today = this.selectedDate;
    this.dailyEvents = this.events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()
      );
    });
  }

  // Personalizar el contenido del evento (agregar un punto de color y nombre del tratamiento)
  customEventContent(arg: any) {
    const { event } = arg;
    const color = this.getRandomColor(); // Color aleatorio
    const treatmentName = event.title;

    // Retorna el HTML que se mostrará en el evento
    return {
      html: `
        <div class="flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${color};"></span>
          <span>${treatmentName}</span>
        </div>
      `
    };
  }

  // Función para obtener un color aleatorio
  getRandomColor(): string {
    const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#8A2BE2', '#FF1493', '#FF4500'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Obtener los clientes y mapear sus tratamientos
  ngOnInit() {
    this.clientService.getClients().subscribe(
      (response: ClientResponse[]) => {
        // Mapear los tratamientos de todos los clientes a eventos
        this.events = response.flatMap(client => {
          return client.Treatments.map(treatment => ({
            title: `${client.lastName}: ${treatment.treatment}`, // Nombre del cliente + tratamiento
            start: treatment.date, // Fecha del tratamiento
          }));
        });

        console.log(this.events); // Verifica los eventos en consola
        this.filterEventsByDay(); // Filtra los eventos para el día seleccionado
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }
}
