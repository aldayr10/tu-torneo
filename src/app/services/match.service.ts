import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Match {
  idMatch: number;
  idTournament: number;
  teamA: number;
  teamB: number;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class MatchService {
  private matches: Match[] = [];
  private matches$ = new BehaviorSubject<Match[]>([]);

  getMatches() {
    return this.matches$.asObservable();
  }

  addMatch(match: Match) {
    this.matches.push(match);
    this.matches$.next(this.matches);
  }

  getMatchesByTournament(idTournament: number) {
    return this.matches.filter(m => m.idTournament === idTournament);
  }
}
