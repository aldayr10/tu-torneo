import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { BehaviorSubject, map } from 'rxjs';
import { TEAMS } from '../fake-data/teams.data';
import { Player } from '../models/player';
import { PlayerService } from './player';
import { NotificationService } from './notification.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[] = TEAMS;
  private teamsSource = new BehaviorSubject<Team[]>([]);

  teams$ = this.teamsSource.asObservable();

  constructor(
    private playerService: PlayerService,
    private notificationService: NotificationService
  ) { }



  createTeam(team: Team) {
    team.idTeam = this.teams.length + 1;
    this.teams.push(team);
    this.teamsSource.next([...this.teams]);
  }

  getTeams() {
    this.teamsSource.next([...this.teams]);
    return this.teams$;
  }

  getTeamById(idTeam:number){
    this.teamsSource.next([...this.teams]);
    let team  = this.teams.find(t=>t.idTeam)
    return team
    
        
    
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

  sendTeamInvitation(team: Team, user: User) {
  const player = this.playerService.getPlayerByIdUser(user.idUser);

  if (!player) return;

  if (!team.pendingInvitations) {
    team.pendingInvitations = [];
  }

  const alreadyMember = team.players.some(
    p => p.idPlayer === player.idPlayer
  );

  const alreadyInvited = team.pendingInvitations.some(
    p => p.idPlayer === player.idPlayer
  );

  if (alreadyMember || alreadyInvited) return;

  team.pendingInvitations.push(player);

  this.notificationService.createNotification({
    idNotification: 0,
    userId: user.idUser,
    type: 'team_invitation',
    title: 'Invitación de equipo',
    message: `${team.name} te ha invitado a unirte`,
    teamId: team.idTeam,
    playerId: player.idPlayer,
    read: false,
    createdAt: new Date()
  });
  alert(`invitacion envia a ${user.email}`)
  this.teamsSource.next([...this.teams]);
}

  acceptInvitation(team: Team, user: User) {
  if (!team || !user) return;

  const player = this.playerService.getPlayerByIdUser(user.idUser);

  if (!player) return;

  if (!team.players.some(
    p => p.idPlayer === player.idPlayer
  )) {
    team.players.push(player);
  }

  team.pendingInvitations = team.pendingInvitations.filter(
    p => p.idPlayer !== player.idPlayer
  );

  this.notificationService.createNotification({
    idNotification: 0,
    userId: team.ownerId,
    type: 'team_response',
    title: 'Invitación aceptada',
    message: `${player.name} aceptó la invitación a ${team.name}`,
    read: false,
    createdAt: new Date()
  });

  this.teamsSource.next([...this.teams]);
}

  rejectInvitation(team: Team, user: User) { 
    const player = this.playerService.getPlayerByIdUser(user.idUser); 
    if (!player) return; 
    team.pendingInvitations = team.pendingInvitations.filter( p => p.idPlayer !== player.idPlayer ); 
    this.teamsSource.next([...this.teams]); 
  }

  getTeamByIdTeam(teamId: number): Team | undefined {
    return this.teams.find(team => team.idTeam === teamId);
  }

  addTeam(team: Team) {
    team.idTeam = this.teams.length + 1;
    team.players = [];
    team.invitationCode = Math.floor(100000 + Math.random() * 900000).toString();

    this.teams.push(team);
    this.teamsSource.next([...this.teams]);
  }

  addPlayerToTeam(idTeam: number, player: any) {
    const team = this.getTeamByIdTeam(idTeam);
    if (!team) return;

    team.players = team.players || [];

    const exists = team.players.some(p => p.idPlayer === player.idPlayer);
    if (!exists) {
      team.players.push(player);
      this.teamsSource.next([...this.teams]);
    }
  }

  joinTeamFromRequest(idTeam: number, player: any) {
    this.addPlayerToTeam(idTeam, player);
  }

  invitePlayer(teamId: number, player: Player) {
    const team = this.getTeamByIdTeam(teamId);

    if (team) {
      team.players.push(player);
    }
  }

  generateInviteLink(teamId: number): string {
    return `https://localhost:4200.com/invite/team/${teamId}`;
  }
}