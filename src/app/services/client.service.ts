import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../types/client';

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

  getOneClient(id : any): Observable<any> {
    return this.http.get<any>(`${this.backUrl}/${id}`);
  }

  createClients( credentials : any ) : Observable<string>{
    return this.http.post<string>(this.backUrl , credentials ,{
      withCredentials: true // Esto asegura que las cookies se envíen con la solicitud
    } )
  }
}
