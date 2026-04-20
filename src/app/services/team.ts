import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { TEAMS } from '../fake-data/teams.data';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[] = TEAMS;
  private teamsSource = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSource.asObservable();


  createTeam(team: Team) {
    team.idTeam = this.teams.length + 1;
    this.teams.push(team);
    this.teamsSource.next([...this.teams]);
  }

  getTeams() {
    this.teamsSource.next([...this.teams]);
    return this.teams$;
  }

  deteleTeam(id: number) {
    this.teams.find(team => team.idTeam !== id)
    this.teams = this.teams.filter(team => team.idTeam !== id);
    this.teamsSource.next([...this.teams]);
  }

  getTeamsByOwner(ownerId: number) {
    this.teamsSource.next([...this.teams]);
    return this.teams$.pipe(
      map(teams =>
        teams.filter(team =>
          team.ownerId === ownerId
        )
      )
    );
  }

  getTeamsByOwnerByCategory(ownerId: number, categoryId: number) {
    this.teamsSource.next([...this.teams]);
    return this.teams$.pipe(
      map(teams =>
        teams.filter(team => 
          team.ownerId === ownerId &&
          team.categoryId === categoryId
        
        )
      )
    );
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