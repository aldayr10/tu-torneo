import { Injectable,OnInit } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[] = [];
  private teamsSource = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSource.asObservable();
  index = -1

  createTeam(team: Team) {
    team.id = this.teams.length + 1;
    this.teams.push(team);
    this.teamsSource.next(this.teams);
    return team;
  }
//post , put ,delete
  getTeams() {
    return this.teams;
  }

  deteleTeams(id: number){
    this.index = this.teams.findIndex(o => o.id == id)
    this.teams.splice(this.index, 1);
    this.teamsSource.next(this.teams);
  }
  getTeamsByOwner(ownerId: number) {
    return this.teams.filter(team => team.ownerId === ownerId);
  }
  getTeamById(teamId: number): Team | undefined {
    return this.teams.find(team => team.id === teamId);
  }

  invitePlayer(teamId: number, player: User) {
    const team = this.getTeamById(teamId);

    if (team) {
      team.players.push(player);
    }
  }

  generateInviteLink(teamId: number): string {
    return `https://localhost:4200.com/invite/team/${teamId}`;
  }
}