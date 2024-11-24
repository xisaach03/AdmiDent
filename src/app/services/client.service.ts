import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private backUrl = `${environment.apiUrl}clients`

  constructor( private http: HttpClient) { }

      // Método para obtener todas las imágenes
  getClients(): Observable<any> {
    return this.http.get<any>(this.backUrl);
  }
}
