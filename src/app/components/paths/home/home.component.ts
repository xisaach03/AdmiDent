import { Component } from '@angular/core';
import { NewUserComponent } from '../../layout/new-user/new-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
