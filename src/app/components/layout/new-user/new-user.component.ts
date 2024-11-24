import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { error } from 'console';


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

  constructor( private formBuilder : FormBuilder){

    this.form = this.formBuilder.group({
      name : ['' , [Validators.required ,Validators.minLength(3)]],
      lastName : ['' , [Validators.required , Validators.minLength(3)]],
      email : ['' , [Validators.required , Validators.email]],
      password :  ['' , [Validators.required , Validators.minLength(6)]],
      phone :  ['' , [Validators.required , Validators.minLength(10)]],
      gender :  ['' , [Validators.required]],
      birthday :  ['' , [Validators.required]],
      age :  ['' , [Validators.required]],
      occupation :  ['' , [Validators.required]],
      hobbies :  ['' , [Validators.required]],
      emergencyContact :  ['' , [Validators.required , Validators.minLength(10)]],
      treatment_day :  ['' , [Validators.required]],
      treatments :  ['' , [Validators.required]],
    })
  }


  addNewUser(){
    if(this.form.valid){
      console.log(this.form.getRawValue())
    }else{
      console.log('lol')
    }
  }
  
  
}
