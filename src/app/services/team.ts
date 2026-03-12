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

    return team;
  }

  getTeams() {
    return this.teams;
  }
  getTeamsByOwner(ownerId: number) {

    return this.teams.filter(team => team.ownerId === ownerId);

  }
  getTeamById(teamId: number): Team | undefined {
    return this.teams.find(team => team.id === teamId);
  }

  invitePlayer(teamId: number, playerId: number) {
    const team = this.getTeamById(teamId);

    if(team){
      team.players.push(playerId);
    }
  }

  generateInviteLink(teamId: number): string {
    return `https://tuapp.com/invite/team/${teamId}`;
  }
}