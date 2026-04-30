import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentMatchService {

  private matches: any[] = [];
  private matches$ = new BehaviorSubject<any[]>([]);

  getMatches() {
    return this.matches$.asObservable();
  }

  getMatchesByTournament(idTournament: number) {
    return this.matches$.pipe(
      map(m => m.filter(x => x.idTournament === idTournament))
    );
  }

  generateRounds(tournament: any) {

    const teams = [...tournament.teams];

    if (teams.length < 2) return;

    const exists = this.matches.some(m => m.idTournament === tournament.idTournament);
    if (exists) return;

    let round = 1;

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {

        this.matches.push({
          idMatch: Date.now() + Math.random(),
          idTournament: tournament.idTournament,
          teamA: teams[i],
          teamB: teams[j],
          round: round,
          finished: false,
          date: new Date()
        });

        round++;
      }
    }

    this.matches$.next([...this.matches]);
  }

  finishMatch(idMatch: number) {
    const match = this.matches.find(m => m.idMatch === idMatch);
    if (match) {
      match.finished = true;
      this.matches$.next([...this.matches]);
    }
  }

  isRoundCompleted(idTournament: number, round: number) {
    const matches = this.matches.filter(
      m => m.idTournament === idTournament && m.round === round
    );

    return matches.length > 0 && matches.every(m => m.finished);
  }

}