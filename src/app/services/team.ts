import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teams: Team[] = [];

  createTeam(team: Team) {

    team.id = this.teams.length + 1;

    this.teams.push(team);

  }

  getTeams() {
    return this.teams;
  }
  getTeamsByOwner(ownerId: number) {

    return this.teams.filter(team => team.ownerId === ownerId);

  }

}