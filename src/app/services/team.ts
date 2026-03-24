import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';

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

  invitePlayer(teamId: number, player: User) {
    const team = this.getTeamById(teamId);

    if(team){
      team.players.push(player);
    }
  }

  generateInviteLink(teamId: number): string {
    return `https://tuapp.com/invite/team/${teamId}`;
  }
}