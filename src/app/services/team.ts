import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { TEAMS } from '../fake-data/teams.data';

@Injectable({
  providedIn:'root'
})
export class TeamService{

  teams:Team[] = TEAMS;

  getTeams(){
    return this.teams;
  }

  addTeam(team:Team){

    team.id = Date.now();

    this.teams.push(team);

  }

}