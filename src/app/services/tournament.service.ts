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
    console.log(tournament);
    
    tournament.idTournament=this.tournaments.length+1;
    this.tournaments.push(tournament);
    
    return this.myTournamens(tournament.idOwner)
  }

  getListRegistrationTournaments(idOwner: number) {
    const filter=this.tournaments.filter(t => t.idOwner !== idOwner);
    this.tournamentsSource.next([...filter]);
    return this.tournament$
  }

  myTournamens(id: number) {
    const filter=this.tournaments.filter(t => t.idOwner === id);
    this.tournamentsSource.next([...filter]);
    return this.tournament$
  }



}