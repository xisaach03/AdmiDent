import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Image } from '../types/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private backUrl = `${environment.apiUrl}home/images`

  constructor( private http: HttpClient) { }

      // Método para obtener todas las imágenes
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.backUrl);
  }
}
