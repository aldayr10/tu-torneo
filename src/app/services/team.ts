import { Injectable,OnInit } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { TEAMS } from '../fake-data/teams.data';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[] = TEAMS;
  private teamsSource = new BehaviorSubject<Team[]>([]);
  private teams$ = this.teamsSource.asObservable();


  createTeam(team: Team) {
    team.idTeam = this.teams.length + 1;
    this.teams.push(team);
    this.teamsSource.next([...this.teams]);
    return this.teams$;
  }
//post , put ,delete
  getTeams() {
    return this.teams$;
  }

  deteleTeam(id: number){
    this.teams.find(team => team.idTeam !== id)
    this.teams = this.teams.filter(team => team.idTeam !== id);
    this.teamsSource.next([...this.teams]);
  }
  getTeamsByOwner(ownerId: number) {
    const filter=this.teams.filter(team => team.ownerId === ownerId);
    this.teamsSource.next([...filter]);
    return this.teams$;
  }

  getTeamsByOwnerByCategory(ownerId: number,category:number) {
    const filter= this.teams.filter(team => team.ownerId === ownerId && team.category===category);
    this.teamsSource.next([...filter]);
    return this.teams$;
  }

  getTeamByIdTeam(teamId: number): Team | undefined {
    return this.teams.find(team => team.idTeam === teamId);
  }

  invitePlayer(teamId: number, player: User) {
    const team = this.getTeamByIdTeam(teamId);

    if (team) {
      team.players.push(player);
    }
  }

  generateInviteLink(teamId: number): string {
    return `https://localhost:4200.com/invite/team/${teamId}`;
  }
}