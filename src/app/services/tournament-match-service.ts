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

    const exists = this.matches.some(
      m => m.idTournament === tournament.idTournament
    );

    if (exists) return;

    if (teams.length % 2 !== 0) {
      teams.push({ name: 'DESCANSA' });
    }

    const totalRounds = teams.length - 1;
    const matchesPerRound = teams.length / 2;

    let rotatedTeams = [...teams];

    for (let round = 0; round < totalRounds; round++) {

      for (let match = 0; match < matchesPerRound; match++) {

        const teamA = rotatedTeams[match];
        const teamB = rotatedTeams[rotatedTeams.length - 1 - match];

        if (teamA.name !== 'DESCANSA' && teamB.name !== 'DESCANSA') {

          this.matches.push({
            idMatch: Date.now() + Math.random(),
            idTournament: tournament.idTournament,
            teamA,
            teamB,
            round: round + 1,
            finished: false,
            date: new Date()
          });

        }
      }

      const fixed = rotatedTeams[0];
      const rest = rotatedTeams.slice(1);

      rest.unshift(rest.pop());

      rotatedTeams = [fixed, ...rest];
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