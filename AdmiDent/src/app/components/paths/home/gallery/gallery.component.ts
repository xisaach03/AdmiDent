import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface treatment{
  plan : string ,
  url : string
}
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  img : treatment[] = [
    // {plan: 'Imagen 1' , url : 'https://feji.us/acnawz'},
    // {plan: 'Imagen 2' , url : 'https://feji.us/acnawz'},
    // {plan: 'Imagen 3' , url : 'https://feji.us/acnawz'},
    // {plan: 'Imagen 4' , url : 'https://feji.us/acnawz'},
  ]

  planEmpty(){
return this.img.length === 0 ? true : false;
  }


}
