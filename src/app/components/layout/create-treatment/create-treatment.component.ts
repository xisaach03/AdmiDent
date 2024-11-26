import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LADPatiensTreatmentComponent } from '../../paths/home/ladpatiens-treatment/ladpatiens-treatment.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-create-treatment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-treatment.component.html',
  styleUrl: './create-treatment.component.scss'
})
export class CreateTreatment {
  
  message: string = "mensaje";
  showModal: boolean = false;
  today: string = '';
  modalText: string = ''

  constructor( private treatment: LADPatiensTreatmentComponent, private http: HttpClient) { }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.toLocaleDateString(); // Formatea la fecha como 'DD/MM/YYYY'
  }

  closeModal(): void {
    this.treatment.closeAddModal()
  }

  save() {
    const url = `${environment.apiUrl}treatment`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const update = {
      email: this.treatment.cliente!.email,
      Treatments: {
        date: this.today,
        treatment: this.modalText
      }
    }
    console.log('update: ', update)
    this.http.put(url, update, { headers }).subscribe(
      response => {
        console.log("response: ", response)
      }
    );
    console.log('se ha guardado')
    this.closeModal()
  }

}