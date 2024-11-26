import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';
import { TreatmentModalService } from '../../../../services/treatment-modal.service';
import { CreateTreatment } from "../../../layout/create-treatment/create-treatment.component";
import { EditTreatment } from "../../../layout/edit-treatment/edit-treatment.component";
import { Client } from '../../../../types/client';
import { NewUserComponent } from '../../../layout/new-user/new-user.component';


@Component({
  selector: 'app-ladpatiens-treatment',
  standalone: true,
  imports: [CreateTreatment, EditTreatment ,NewUserComponent],
  templateUrl: './ladpatiens-treatment.component.html',
  styleUrl: './ladpatiens-treatment.component.scss'
})
export class LADPatiensTreatmentComponent {

  clients: any[] = [];
  selectedClientId: string | null = null;
  inputName: string = '';
  inputLastname: string = '';
  addModal: boolean = false;
  editModal: boolean = false;
  cliente: Client | undefined;
  isShowing : boolean = false;

constructor( private http : HttpClient ,private clientService : ClientService, private router: Router, private tms: TreatmentModalService) { }


  ngOnInit() {
    const patientsElement = document.getElementById('patients');
    const url = `${environment.apiUrl}home`;

    // Realizamos la llamada HTTP y nos suscribimos al observable
    this.clientService.getClients().subscribe(data => {
      this.clients = Array.isArray(data) ? data : [];
      console.log(this.clients)
    });

  }

  onSelectClient(client: any): void {
    this.selectedClientId = client._id;
    this.inputName = client.firstName;
    this.inputLastname = client.lastName;
    this.cliente = client;
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

  openAddModal(): void {
    this.tms.showModal = true;
    this.addModal = true;
  }

  closeAddModal(): void {
    this.tms.showModal = false;
    this.addModal = false;
  }

  openEditModal(): void {
    this.tms.showModal = true;
    this.editModal = true;
  }

  closeEditModal(): void {
    this.tms.showModal = false;
    this.editModal = false;
  }

  showModal(){
    this.isShowing = true
  } 

  closeModal(){
    this.isShowing = false
  }
}
