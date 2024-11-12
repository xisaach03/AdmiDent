import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) {}

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const userCookie = this.cookieService.get('user')
    console.log('Cookie user:', userCookie); // Agrega esto para depuración
    if(userCookie){
      return true;
    }else{
      return false
    }
  }
}