import { Component } from '@angular/core';
import { LADPatiensTreatmentComponent } from '../../paths/home/ladpatiens-treatment/ladpatiens-treatment.component';

@Component({
  selector: 'app-edit-treatment',
  standalone: true,
  imports: [],
  templateUrl: './edit-treatment.component.html',
  styleUrl: './edit-treatment.component.scss'
})
export class EditTreatment {

  showModal: boolean = false;
  today: string = '';

  constructor( private treatment: LADPatiensTreatmentComponent) { }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.toLocaleDateString(); // Formatea la fecha como 'DD/MM/YYYY'
  }

  closeModal(): void {
    this.treatment.closeEditModal()
  }

  save() {
    console.log('se ha guardado')
    this.closeModal()
  }

}
