import { Injectable } from '@angular/core';
import { TOURNAMENTS } from '../fake-data/tournaments.data';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { map } from 'rxjs';

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

  startTournament(id: number) {
    const t = this.tournaments.find(t => t.idTournament === id);

    if (t) {
      t.estado = 'EN_CURSO';
      this.tournamentsSource.next([...this.tournaments]);
    }
  }

  addTournament(tournament: Tournament) {

    tournament.idTournament = this.tournaments.length + 1;
    this.tournaments.push(tournament);
    return this.myTournamens(tournament.idOwner)
  }

  getListRegistrationTournaments(idOwner: number) {
    const filter = this.tournaments.filter(t => t.idOwner !== idOwner);
    this.tournamentsSource.next([...filter]);
    return this.tournament$
  }

  myTournamens(idOwner: number) {
    const filter = this.tournaments.filter(t => t.idOwner === idOwner);
    this.tournamentsSource.next([...filter]);
    return this.tournament$
  }

  addTeamToTournament(tournament: Tournament, team: Team) {
    tournament.teams.push(team);
    console.log(tournament);
    this.tournamentsSource.next([...this.tournaments]);
  }

  getTournamentById(id: number) {
    return this.tournament$.pipe(
      map(tournaments => tournaments.find(t => t.idTournament === id))
    );
  }

}