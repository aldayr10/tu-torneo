import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournaments: Tournament[] = [];
  private teamsSource = new BehaviorSubject<Tournament[]>([]);
  teams$ = this.teamsSource.asObservable();


  getTournaments() {
    return this.tournaments;
  }

  addTeamToTournament(tournamentId: number, team: any) {

    const tournament = this.tournaments.find(
      t => t.idTournament === tournamentId
    );

    if (tournament) {
      tournament.teams.push(team);
    }
    console.log(tournament);
    
  }


}