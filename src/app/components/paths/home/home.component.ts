import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  goToGall() {
    this.router.navigate(['/gallery'])
  }

  goToSumm() {
    this.router.navigate(['/summary'])
  }

  goToTreat() {
    this.router.navigate(['/treatment'])
  }

}
