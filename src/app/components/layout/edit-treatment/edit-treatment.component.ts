import { Component } from '@angular/core';
import { LADPatiensTreatmentComponent } from '../../paths/home/ladpatiens-treatment/ladpatiens-treatment.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-edit-treatment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-treatment.component.html',
  styleUrl: './edit-treatment.component.scss'
})
export class EditTreatment {

  showModal: boolean = false;
  today: string = '';
  modalText: string = ''

  constructor(private treatment: LADPatiensTreatmentComponent, private http: HttpClient) { }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.toLocaleDateString();
  }

  closeModal(): void {
    this.treatment.closeEditModal()
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
    this.http.put(url, update, { headers });
    console.log('se ha guardado')
    this.closeModal()
  }

}
