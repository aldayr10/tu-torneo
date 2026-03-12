import { Injectable } from '@angular/core';
import { TOURNAMENTS } from '../fake-data/tournaments.data';

@Injectable({
  providedIn:'root'
})
export class TournamentService{

  tournaments = TOURNAMENTS;

  getTournaments(){
    return this.tournaments;
  }

  addTeamToTournament(tournamentId:number,team:any){

    const tournament = this.tournaments.find(
      t => t.id === tournamentId
    );

    if(tournament){
      tournament.teams.push(team);
    }

  }

}