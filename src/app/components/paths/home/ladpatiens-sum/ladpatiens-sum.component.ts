import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../modules/material/material.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-ladpatiens-sum',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, MaterialModule],
  templateUrl: './ladpatiens-sum.component.html',
  styleUrl: './ladpatiens-sum.component.scss'
})

export class LADPatiensSumComponent implements OnInit{

  constructor(private http: HttpClient) {}

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