import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team } from '../models/team';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api-config';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private teamsSource = new BehaviorSubject<Team[]>([]);

  teams$ = this.teamsSource.asObservable();

  createTeam(team: Team): Observable<Team> {
    const payload = {
      name: team.name,
      categoryId: Number(team.categoryId),
      ownerId: Number(team.ownerId),
      primaryColor: team.primaryColor,
      alternativeColor: team.alternativeColor,
      image: typeof team.image === 'string' ? team.image : undefined,
      invitationCode: team.invitationCode || this.createInvitationCode(),
    };
    return this.http.post<Team>(`${this.baseUrl}/team`, payload).pipe(
      map(created => this.normalizeTeam(created)),
      tap(created => this.updateCache([...this.teamsSource.value, created])),
    );
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team`).pipe(
      map(teams => teams.map(team => this.normalizeTeam(team))),
      tap(teams => this.updateCache(teams)),
    );
  }

  fetchTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/${id}`).pipe(
      map(team => this.normalizeTeam(team)),
      tap(team => this.upsertCache(team)),
    );
  }

  getTeamById(id: number): Observable<Team> {
    return this.fetchTeamById(id);
  }

  getTeamByInvitationCode(code: string): Observable<Team | undefined> {
    return this.getTeams().pipe(map(teams => teams.find(team => team.invitationCode === code)));
  }

  getTeamsList(): Team[] {
    return this.teamsSource.value;
  }

  deteleTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/team/${id}`).pipe(
      tap(() => this.updateCache(this.teamsSource.value.filter(team => team.idTeam !== id))),
    );
  }

  getTeamsByOwner(ownerId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team/owner/${ownerId}`).pipe(
      map(teams => teams.map(team => this.normalizeTeam(team))),
      tap(teams => this.updateCache(teams)),
    );
  }

  getTeamsByOwnerByCategory(ownerId: number, category: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${this.baseUrl}/team/owner/${ownerId}/category/${category}`,
    ).pipe(
      map(teams => teams.map(team => this.normalizeTeam(team))),
      tap(teams => this.updateCache(teams)),
    );
  }

  getTeamByIdTeam(teamId: number): Team | undefined {
    return this.teamsSource.value.find(team => team.idTeam === teamId);
  }

  addTeam(team: Team): Observable<Team> {
    return this.createTeam(team);
  }

  addPlayerToTeam(idTeam: number, player: Player): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/team/${idTeam}/players`, {
      playerId: player.idPlayer,
    }).pipe(
      map(team => this.normalizeTeam(team)),
      tap(team => this.upsertCache(team)),
    );
  }

  removePlayerFromTeam(idTeam: number, playerId: number): Observable<Team> {
    return this.http.delete<Team>(`${this.baseUrl}/team/${idTeam}/players/${playerId}`).pipe(
      map(team => this.normalizeTeam(team)),
      tap(team => this.upsertCache(team)),
    );
  }

  joinTeamFromRequest(idTeam: number, player: Player): Observable<Team> {
    return this.addPlayerToTeam(idTeam, player);
  }

  invitePlayer(teamId: number, player: Player) {
    this.addPlayerToTeam(teamId, player).subscribe();
  }

  generateInviteLink(teamId: number): string {
    return `${this.baseUrl.replace(/\/api\/v1$/, '')}/invite/team/${teamId}`;
  }

  private normalizeTeam(team: Team): Team {
    return {
      ...team,
      image: team.image ?? '',
      invitationCode: String(team.invitationCode ?? ''),
      players: team.players ?? [],
      pendingInvitations: team.pendingInvitations ?? [],
    };
  }

  private updateCache(teams: Team[]): void {
    this.teamsSource.next(teams);
  }

  private upsertCache(team: Team): void {
    this.updateCache([
      ...this.teamsSource.value.filter(item => item.idTeam !== team.idTeam),
      team,
    ]);
  }

  private createInvitationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
