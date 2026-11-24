import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { TeamService } from '../../../../../services/team';
import { AuthService } from '../../../../../services/auth';
import { PlayerService } from '../../../../../services/player';
import { Team } from '../../../../../models/team';
import { Player } from '../../../../../models/player';

@Component({
  selector: 'app-leave-team',
  standalone: true,
  templateUrl: './leave-team.html',
  styleUrls: ['./leave-team.css'],
  imports: [CommonModule, FormsModule]
})
export class LeaveTeam implements OnInit {
  teams: Team[] = [];
  selectedTeamId: number | null = null;
  message = '';
  error = '';
  loading = false;
  myPlayerId: number | null = null;

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.loading = true;
    this.playerService.getPlayerByIdUser(user.idUser).pipe(
      switchMap((player: Player) => {
        this.myPlayerId = player.idPlayer;
        return this.teamService.getTeams();
      }),
    ).subscribe({
      next: (teams: Team[]) => {
        this.teams = teams.filter((t: Team) => (t.players || []).some((p: any) => p.idPlayer === this.myPlayerId));
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus equipos.';
        this.loading = false;
      }
    });
  }

  leaveTeam(): void {
    if (!this.selectedTeamId || !this.myPlayerId) return;
    this.teamService.removePlayerFromTeam(this.selectedTeamId, this.myPlayerId).subscribe({
      next: () => {
        this.message = 'Saliste del equipo correctamente.';
        this.error = '';
        this.teams = this.teams.filter(t => t.idTeam !== this.selectedTeamId);
        this.selectedTeamId = null;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'No se pudo salir del equipo.';
        this.message = '';
      }
    });
  }
}
