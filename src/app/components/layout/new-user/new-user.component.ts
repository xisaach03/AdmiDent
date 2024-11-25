import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { error } from 'console';
import { ClientService } from '../../../services/client.service';


@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent{
  @Input() isOpen: boolean = false; // Para controlar si el modal está abierto o cerrado
  @Output() closeModal = new EventEmitter<void>(); // Para emitir evento de cierre
  form : FormGroup;

  constructor( private formBuilder : FormBuilder , private clientService : ClientService){

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]], // Campo requerido
      lastName: ['', [Validators.required]], // Campo requerido
      email: ['', [Validators.required, Validators.email]], // Campo requerido con validación de correo
      password: ['', [Validators.required, Validators.minLength(6)]], // Campo requerido con longitud mínima
      phone: [''], // Campo opcional
      gender: [''], // Campo opcional
      Birthday: [''], // Campo opcional (fecha de nacimiento)
      Age: [null], // Campo opcional (número)
      Occupation: [''], // Campo opcional
      Hobbies: [''], // Campo opcional
      EmergencyContact: [''], // Campo opcional
      Treatments: [[]] // Campo opcional (array vacío por defecto)
    });
    
  }


  addNewUser(){
    if(this.form.valid){
      this.clientService.createClients(this.form.getRawValue()).subscribe({
        next : (data) => {
          console.log('Todo bien')
        }
    })
    }else{
      console.log('lol')
    }
  }
  
  
}
