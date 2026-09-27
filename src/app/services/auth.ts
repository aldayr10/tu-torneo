import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, timeout } from 'rxjs';
import { API_BASE_URL } from '../core/api-config';
import { User } from '../models/user';

import { PlayerService } from '../services/player';
import { ProfileService } from '../services/profile';

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private timeout: any;
  private tiempoSesion = 50 * 60 * 1000;
  private pendingHydration: Promise<boolean> | null = null;

  constructor(
    private profileService: ProfileService,
    private playerService: PlayerService
  ) { }

  async login(email: string, password: string): Promise<boolean> {
    this.clearSession();
    const response = await firstValueFrom(this.http
      .post<{ access_token: string; token_type: 'Bearer'; expires_in: number }>(
        `${this.apiBaseUrl}/auth/login`, { email, password },
      )
      .pipe(timeout(10_000)));

    if (!response.access_token) {
      throw new Error('El backend no devolvió un token de acceso.');
    }

    this.writeToken(response.access_token);
    return this.hydrate();
  }

  hydrate(): Promise<boolean> {
    if (this.pendingHydration) return this.pendingHydration;
    if (!this.readToken()) return Promise.resolve(false);

    this.pendingHydration = firstValueFrom(this.http
      .get<User>(`${this.apiBaseUrl}/auth/me`)
      .pipe(timeout(10_000)))
      .then(user => {
        this.writeUser(user);
        const player = this.playerService.getPlayerByIdUser(user.idUser);
        this.profileService.setProfile(player ?? null);
        this.iniciarContador();
        return true;
      })
      .catch(() => {
        this.clearSession();
        return false;
      })
      .finally(() => {
        this.pendingHydration = null;
      });

    return this.pendingHydration;
  }

  logout(){
    this.clearSession();
    alert("Sesión expirada");
    this.router.navigate(['/login']);
  }

  getCurrentUser():User | null{
    try {
      const user = this.document.defaultView?.localStorage.getItem('user');
      return user ? JSON.parse(user) as User : null;
    } catch {
      return null;
    }
  }

  iniciarContador(){
    this.limpiarContador();
    this.timeout = setTimeout(() => {
      this.logout();
    }, this.tiempoSesion);
  }

  resetearContador(){
    this.iniciarContador();
  }

  limpiarContador(){
    if(this.timeout){
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private clearSession(): void {
    this.limpiarContador();
    this.pendingHydration = null;
    this.profileService.setProfile(null);
    try {
      this.document.defaultView?.sessionStorage.removeItem('access_token');
      this.document.defaultView?.localStorage.removeItem('user');
    } catch {
      // Browser storage may be unavailable.
    }
  }

  private readToken(): string | null {
    try {
      return this.document.defaultView?.sessionStorage.getItem('access_token') ?? null;
    } catch {
      return null;
    }
  }

  private writeToken(token: string): void {
    const storage = this.document.defaultView?.sessionStorage;
    if (!storage) throw new Error('El almacenamiento de sesión no está disponible.');
    storage.setItem('access_token', token);
  }

  private writeUser(user: User): void {
    this.document.defaultView?.localStorage.setItem('user', JSON.stringify(user));
  }

}