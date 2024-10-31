import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.apiUrl}login`; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(this.loginUrl, credentials, {
      responseType: 'text',
      withCredentials: true // Incluye este flag
    });
  }
  
}
