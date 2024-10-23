import { Component } from '@angular/core';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  datos: any;

  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.datos = this.registerService.registrar()
  }
}
