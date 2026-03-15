import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080/api/teams';
  private teams: Team[] = [];

  constructor(private http: HttpClient) {}

  // Crear un equipo
  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team)
      .pipe(
        tap(created => console.log('Equipo creado:', created)),
        catchError(this.handleError<Team>('createTeam'))
      );
  }

  // Obtener todos los equipos
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }

  // Obtener equipos por owner, maneja 404 devolviendo array vacío
  getTeamsByOwner(ownerId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/owner/${ownerId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.warn(`No se encontró equipo para ownerId=${ownerId}`);
            return of([]); // Devuelve array vacío en caso de 404
          }
          return this.handleError<Team[]>('getTeamsByOwner', [])(error);
        })
      );
  }

  // Invitar un jugador a un equipo
  invitePlayer(teamId: number, playerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${teamId}/invite`, { playerId })
      .pipe(
        catchError(this.handleError<any>('invitePlayer'))
      );
  }

  // Generar enlace de invitación
  generateInviteLink(teamId: number): string {
    return `http://localhost:4200/invite/team/${teamId}`;
  }

  // Obtener un equipo por ID desde cache local
  getTeamById(teamId: number): Observable<Team> {
    const team = this.teams.find(t => t.id === teamId);
    return of(team!); // 'of' convierte el objeto en Observable
  }

  // Función genérica de manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error); // log en consola
      return of(result as T); // Devuelve un valor seguro para que la app no rompa
    };
  }

}