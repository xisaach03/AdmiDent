import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../modules/material/material.module';


@Component({
  selector: 'app-ladpatiens-sum',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, MaterialModule],
  templateUrl: './ladpatiens-sum.component.html',
  styleUrl: './ladpatiens-sum.component.scss'
})
export class LADPatiensSumComponent {

  value = 'Clear me';


}