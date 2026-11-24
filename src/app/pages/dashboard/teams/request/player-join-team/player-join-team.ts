import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../../../../services/team';
import { RequestService } from '../../../../../services/request';
import { AuthService } from '../../../../../services/auth';
import { PlayerService } from '../../../../../services/player';
import { Team } from '../../../../../models/team';
import { Router } from '@angular/router'

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
    private playerService: PlayerService,
    private router:Router
  ) { }

    goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }
  searchTeam() {
    const code = this.codeControl.value?.trim();
    if (!code) {
      this.errorMessage = 'Ingresa un código válido.';
      this.foundTeam = null; return;
    }
    this.teamService.getTeamByInvitationCode(code).subscribe({
      next: team => {
        this.foundTeam = team ?? null;
        this.errorMessage = team ? '' : 'Equipo no encontrado.';
      },
      error: () => {
        this.foundTeam = null;
        this.errorMessage = 'No se pudo buscar el equipo.';
      },
    });
  }
  sendJoinRequest() {
    if (!this.foundTeam) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.playerService.getPlayerByIdUser(user.idUser).subscribe({
      next: player => {
        this.requestService.createRequest({
          idTeam: this.foundTeam!.idTeam,
          idPlayer: player.idPlayer,
          type: 'Unirse'
        }).subscribe({
          next: () => {
            this.successMessage = 'Solicitud enviada correctamente.';
            this.foundTeam = null;
            this.codeControl.reset();
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'No se pudo enviar la solicitud.';
          }
        });
      },
      error: () => {
        this.errorMessage = 'No se pudo obtener tu perfil de jugador.';
      }
    });
  }
  cancel() {
    this.foundTeam = null;
    this.codeControl.reset();
    this.errorMessage = '';
  }
}