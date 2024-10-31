import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Asegúrate de usar 'inject' correctamente
  const router = inject(Router); // Inyección del Router

  const isAuth = authService.isLoggedIn(); // Verifica si el usuario está loggeado

  if (isAuth) {
    return true; // Permitir el acceso a la ruta
  } else {
    router.navigate(['/login']); // Redirigir a la página de login
    return false; // Bloquear el acceso a la ruta
  }
};
