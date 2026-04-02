import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournaments: any[] = [];

  constructor() {}

  getTournaments() {
    return this.tournaments;
  }

  addTournament(tournament: any) {
    this.tournaments.push(tournament);
  }

}