import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/home');
  }

  registrar(data : string) {
    const url = `${environment.apiUrl}register`
    return this.http.post<any>(
      url,
      data
    )
    .pipe(
      catchError(error => {
        if (error.status !== 200) {
          // Mostrar la alerta aquí, por ejemplo, usando un servicio de alertas o un simple alert()
          alert(`Error al enviar los datos: ${error.status} - ${error.statusText}`);
        }
        return throwError(() => error); // Re-lanzar el error para que pueda ser manejado por otros suscriptores si es necesario
      })
    )
  }
}
