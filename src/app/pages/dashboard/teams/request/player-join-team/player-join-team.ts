import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../../../../services/team';
import { RequestService } from '../../../../../services/request';
import { AuthService } from '../../../../../services/auth';
import { PlayerService } from '../../../../../services/player';
import { Team } from '../../../../../models/team';
@Component({
  selector: 'app-join-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-join-team.html',
  styleUrls: ['./player-join-team.css']
})
export class PlayerJoinTeam {
  codeControl = new FormControl('');
  foundTeam: Team | null = null;
  errorMessage = '';
  successMessage = '';
  constructor(
    private teamService: TeamService,
    private requestService: RequestService,
    private authService: AuthService,
    private playerService: PlayerService) { }
  searchTeam() {
    const code = this.codeControl.value?.trim();
    if (!code) {
      this.errorMessage = 'Ingresa un código válido.';
      this.foundTeam = null; return;
    }
    const team = this.teamService.getTeamsList().find(t => t.invitationCode === code);
    if (!team) {
      this.errorMessage = 'Equipo no encontrado.';
      this.foundTeam = null;
      return;
    }
    this.foundTeam = team;
    this.errorMessage = '';
  }
  sendJoinRequest() {
    if (!this.foundTeam) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const player = this.playerService.getPlayerByIdUser(user.idUser);
    if (!player) return;
    this.requestService.createRequest({
      idTeam: this.foundTeam.idTeam,
      idPlayer: player.idPlayer,
      type: 'Unirse'
    });
    this.successMessage = 'Solicitud enviada correctamente.';
    this.foundTeam = null; this.codeControl.reset();
  }
  cancel() {
    this.foundTeam = null;
    this.codeControl.reset();
    this.errorMessage = '';
  }
}