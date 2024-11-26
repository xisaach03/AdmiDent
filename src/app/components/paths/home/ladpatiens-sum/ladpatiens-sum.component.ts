import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ClientService } from '../../../../services/client.service';
import { NewUserComponent } from '../../../layout/new-user/new-user.component';


@Component({
  selector: 'app-ladpatiens-sum',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent , NewUserComponent],
  templateUrl: './ladpatiens-sum.component.html',
  styleUrl: './ladpatiens-sum.component.scss'
})

export class LADPatiensSumComponent implements OnInit {

  clients: any[] = [];
  selectedClientId: string | null = null;
  inputName: string = '';
  inputLastname: string = '';
  inputEmail: string = '';
  inputPassword: string = '';
  inputPhone: number = 0;
  inputGender: string = '';
  inputBirthday: string = '';
  inputAge: number = 0;
  inputOccupation: string = '';
  inputHobbies: string = '';
  inputEmergencyContact: string = '';
  isShowing : boolean = false;

  constructor(private http: HttpClient, private clientService: ClientService, private router: Router) { }

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


  onSelectClient(client: any): void {
    this.selectedClientId = client._id;
    this.inputName = client.firstName;
    this.inputLastname = client.lastName;
    this.inputEmail = client.email;
    this.inputPassword = client.password;
    this.inputPhone = client.phone;
    this.inputGender = client.gender;
    this.inputBirthday = client.Birthday;
    this.inputAge = client.Age;
    this.inputOccupation = client.Occupation;
    this.inputHobbies = client.Hobbies;
    this.inputEmergencyContact = client.EmergencyContact;
  }

  goToGall() {
    this.router.navigate(['/gallery'])
  }

  goToSumm() {
    this.router.navigate(['/summary'])
  }

  goToTreat() {
    this.router.navigate(['/treatment'])
  }


  showModal(){
    this.isShowing = true
  } 

  closeModal(){
    this.isShowing = false
  }

}