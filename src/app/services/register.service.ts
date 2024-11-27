import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly SERVER_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${this.SERVER_URL}/home`);
  }

  registrar(data : string) {
    const url = `${environment.apiUrl}register`
    return this.http.post<any>(
      url,
      data,
      { withCredentials: true } // Asegura que las cookies se envíen con la solicitud
    )
    .pipe(
      catchError(error => {
        if (error.status !== 200) {
          // Mostrar la alerta aquí, por ejemplo, usando un servicio de alertas o un simple alert()
          alert(`Error al enviar los datos: ${error.status} - ${error.statusText}`);
        }
        return throwError(() => error); // Re-lanzar el error para que pueda ser manejado por otros suscriptores si es necesario
      })
    );
  }
}
