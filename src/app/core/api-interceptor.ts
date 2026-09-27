import { DOCUMENT } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from './api-config';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const base = new URL(inject(API_BASE_URL));
  const document = inject(DOCUMENT);
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

  return next(token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request);
};