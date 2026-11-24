import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { API_BASE_URL } from '../core/api-config';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly tournamentsSource = new BehaviorSubject<Tournament[]>([]);
  readonly tournament$ = this.tournamentsSource.asObservable();

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseUrl}/tournament`).pipe(
      map(tournaments => tournaments.map(tournament => this.normalize(tournament))),
      tap(tournaments => this.tournamentsSource.next(tournaments)),
    );
  }

  startTournament(id: number): Observable<Tournament> {
    // Inicia y guarda el sorteo (idempotente en backend)
    return this.http.post<any[]>(`${this.baseUrl}/tournament/${id}/draw`, {}).pipe(
      switchMap(() => this.getTournamentById(id)),
    );
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    const payload = {
      idOwner: Number(tournament.idOwner),
      name: tournament.name,
      categoryId: Number(tournament.categoryId),
      description: tournament.description?.trim() || null,
      estado: tournament.estado ?? 'ABIERTO',
    };
    return this.http.post<Tournament>(`${this.baseUrl}/tournament`, payload).pipe(
      map(created => this.normalize(created)),
      tap(created => this.upsert(created)),
    );
  }

  getListRegistrationTournaments(ownerId: number): Observable<Tournament[]> {
    return this.getTournaments().pipe(
      switchMap(() => this.tournament$.pipe(
        map(tournaments => tournaments.filter(tournament => tournament.idOwner !== ownerId)),
      )),
    );
  }

  myTournamens(ownerId: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseUrl}/tournament/owner/${ownerId}`).pipe(
      map(tournaments => tournaments.map(tournament => this.normalize(tournament))),
    );
  }

  addTeamToTournament(tournament: Tournament, team: Team): Observable<Tournament> {
    return this.http.post<Tournament>(
      `${this.baseUrl}/tournament/${tournament.idTournament}/teams`,
      { teamId: team.idTeam },
    ).pipe(
      map(updated => this.normalize(updated)),
      tap(updated => this.upsert(updated)),
    );
  }

  removeTeamFromTournament(tournamentId: number, teamId: number): Observable<Tournament> {
    return this.http.delete<Tournament>(
      `${this.baseUrl}/tournament/${tournamentId}/teams/${teamId}`,
    ).pipe(
      map(updated => this.normalize(updated)),
      tap(updated => this.upsert(updated)),
    );
  }

  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.baseUrl}/tournament/${id}`).pipe(
      map(tournament => this.normalize(tournament)),
      tap(tournament => this.upsert(tournament)),
    );
  }

  private normalize(tournament: Tournament): Tournament {
    return { ...tournament, teams: tournament.teams ?? [] };
  }

  private upsert(tournament: Tournament): void {
    this.tournamentsSource.next([
      ...this.tournamentsSource.value.filter(item => item.idTournament !== tournament.idTournament),
      tournament,
    ]);
  }

}