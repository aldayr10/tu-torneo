import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api-config';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root',
})
export class TournamentMatchService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getMatchesByTournament(idTournament: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/match`, {
      params: { tournamentId: idTournament },
    });
  }

  draw(tournamentId: number): Observable<Match[]> {
    return this.http.post<Match[]>(`${this.baseUrl}/tournament/${tournamentId}/draw`, {});
  }

  updateMatch(idMatch: number, payload: Partial<Match>): Observable<Match> {
    return this.http.patch<Match>(`${this.baseUrl}/match/${idMatch}`, payload);
  }
}
