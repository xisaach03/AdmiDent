import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service'; 
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule , MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  apiUrl : string = `${environment.apiUrl}auth/google`

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router 
  ) {
    // Inicialización del formulario
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.getRawValue()).subscribe({
        next: (response) => {
          //verifica si la respuesta es 'OK' por parte de la API gg
          if (response === 'OK') {
            console.log('Login exitoso:', response);
            this.router.navigate(['/home']); //redirección a home
          } else {
            console.error('Respuesta inesperada:', response);
            alert('Error inesperado al iniciar sesión.');
          }
        },
        error: (err) => {
          if (err.status === 401) {
            alert('Credenciales incorrectas, por favor verifica tu email y contraseña.');
          } else {
            console.error('Error de login', err);
            alert(`Error al iniciar sesión: ${err.statusText}`);
          }
        }
      });
    } else {
      alert('Debes llenar todos los campos correctamente');
    }
  }
  
}
