import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).hydrate().then(authenticated =>
    authenticated ? true : router.createUrlTree(['/login']),
  );
};