import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LADPatiensTreatmentComponent } from '../../paths/home/ladpatiens-treatment/ladpatiens-treatment.component';

@Component({
  selector: 'app-create-treatment',
  standalone: true,
  imports: [],
  templateUrl: './create-treatment.component.html',
  styleUrl: './create-treatment.component.scss'
})
export class CreateTreatment {
  
  message: string = "mensaje";
  showModal: boolean = false;
  today: string = '';

  constructor( private treatment: LADPatiensTreatmentComponent) { }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.toLocaleDateString(); // Formatea la fecha como 'DD/MM/YYYY'
  }

  closeModal(): void {
    this.treatment.closeAddModal()
  }

  save() {
    console.log('se ha guardado')
    this.closeModal()
  }

}