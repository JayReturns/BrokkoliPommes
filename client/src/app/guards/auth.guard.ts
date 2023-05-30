import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log(`Logged in: ${authService.isLoggedIn()}`)
  if (!authService.isLoggedIn()) {
    router.navigate(['login'])
  }
  return true;
};
