import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_BASE_URL } from './api-config';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const base = new URL(inject(API_BASE_URL));
  const document = inject(DOCUMENT);
  const router = inject(Router);
  const url = new URL(request.url, document.baseURI);
  const apiPath = base.pathname.replace(/\/$/, '');
  const isApi = url.origin === base.origin &&
    (url.pathname === apiPath || url.pathname.startsWith(`${apiPath}/`));

  if (!isApi) return next(request);

  let token: string | null = null;
  try {
    token = document.defaultView?.sessionStorage.getItem('access_token') ?? null;
  } catch {
    token = null;
  }

  const authRequest = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(authRequest).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        const isAuthRequest = request.url.includes('/auth/login');
        if (!isAuthRequest) {
          try {
            document.defaultView?.sessionStorage.removeItem('access_token');
            document.defaultView?.localStorage.removeItem('user');
          } catch {
            // ignore
          }
          void router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    }),
  );
};
