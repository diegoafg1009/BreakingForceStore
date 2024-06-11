import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const url = state.url;
  localStorage.setItem('redirectUrl', url);

  if (authService.authStatus() === 'authenticated') {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
