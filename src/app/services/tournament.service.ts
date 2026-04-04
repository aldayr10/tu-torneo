import { Injectable } from '@angular/core';
import { TOURNAMENTS } from '../fake-data/tournaments.data';
import { BehaviorSubject } from 'rxjs';

import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournaments: Tournament[] = TOURNAMENTS;
  private tournamentsSource = new BehaviorSubject<Tournament[]>([]);
  tournament$ = this.tournamentsSource.asObservable();

  constructor() { }

  getTournaments() {
    this.tournamentsSource.next([...this.tournaments]);
    return this.tournament$;
  }

  addTournament(tournament: Tournament) {
    this.tournaments.push(tournament);
    this.tournamentsSource.next([...this.tournaments]);
    return this.tournament$
  }

  getListRegistrationTournaments(idOwner: number) {
    this.tournaments=this.tournaments.filter(t => t.idOwner !== idOwner);
    this.tournamentsSource.next([...this.tournaments]);
    return this.tournament$
  }

  myTournamens(id: number) {
    this.tournaments=this.tournaments.filter(t => t.idOwner === id);
    this.tournamentsSource.next([...this.tournaments]);
    return this.tournament$
  }



}