import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = `${environment.apiUrl}home/upload`
  
  constructor( private http : HttpClient) { }

  //Metodo para subir la imagen 
  uploadImage(credentials: { image: File }): Observable<Blob> {
    const formData = new FormData();
    formData.append('image', credentials.image);
    return this.http.post(this.uploadUrl, formData , {responseType : 'blob'});
  }
  
}
