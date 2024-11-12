import { Component } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;

  datos = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  }

  constructor(private registerService: RegisterService, formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: [() => this.passwordsMatch]
    });
  }

  passwordsMatch() {
    if (!this.form) return null;
    const { password, confirm } = this.form.getRawValue();
    return password === confirm ? null : { passwordsMatch: true }
  }

  signup() {
    console.log('Form? ', this.form);
    if (this.form.valid) {
      console.log('Enviar datos????', this.form.getRawValue());
      this.registerService.registrar(this.form.getRawValue()).subscribe({
        next: (response) => {
          alert('Usuario creado')
          this.datos = response
          this.router.navigate(['/home'])
        },
        error: () => {}
      })
      // this.datos.name = '';
      // this.datos.lastName = '';
      // this.datos.email = '';
      // this.datos.password = '';
      // this.datos.confirm = '';
    } else {
      alert('Debes llenar todos los campos');
    }
  }

}
