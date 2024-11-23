import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-ladpatiens-treatment',
  standalone: true,
  imports: [],
  templateUrl: './ladpatiens-treatment.component.html',
  styleUrl: './ladpatiens-treatment.component.scss'
})
export class LADPatiensTreatmentComponent {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const patientsElement = document.getElementById('patients');
    const url = `${environment.apiUrl}home`;

    // Realizamos la llamada HTTP y nos suscribimos al observable
    this.http.get<any[]>(url).subscribe(
      (patientsList) => {
        console.log('Patient list:', patientsList);

        // Iteramos sobre la lista de pacientes
        patientsList.forEach((patient) => {
          console.log('Patient:', patient.name);
          // Agregamos cada paciente al contenedor
          const patientItem = document.createElement('div');
          patientItem.className = 'patient-item selected';
          patientItem.textContent = patient.name;
          patientsElement?.appendChild(patientItem);
        });
      },
      (error) => {
        console.error('Error fetching patient list:', error);
      }
    );

  }
}
