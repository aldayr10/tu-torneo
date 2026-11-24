import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../../../services/team';
import { AuthService } from '../../../../../services/auth';
import { Team } from '../../../../../models/team';

@Component({
  selector: 'app-delete-player-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-player-team.html',
  styleUrls: ['./delete-player-team.css']
})
export class DeletePlayerTeam implements OnInit {
  teams: Team[] = [];
  selectedTeamId: number | null = null;
  selectedPlayerId: number | null = null;
  message = '';
  error = '';
  loading = false;

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.loading = true;
    this.teamService.getTeamsByOwner(user.idUser).subscribe({
      next: (teams: Team[]) => {
        this.teams = teams;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus equipos.';
        this.loading = false;
      }
    });
  }

  get selectedTeam(): Team | undefined {
    return this.teams.find(t => t.idTeam === this.selectedTeamId);
  }

  removePlayer(): void {
    if (!this.selectedTeamId || !this.selectedPlayerId) return;
    if (!confirm('¿Seguro que deseas eliminar este jugador del equipo?')) return;
    this.teamService.removePlayerFromTeam(this.selectedTeamId, this.selectedPlayerId).subscribe({
      next: () => {
        this.message = 'Jugador eliminado correctamente.';
        this.error = '';
        const team = this.selectedTeam;
        if (team) {
          team.players = (team.players || []).filter((p: any) => p.idPlayer !== this.selectedPlayerId);
        }
        this.selectedPlayerId = null;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'No se pudo eliminar al jugador.';
        this.message = '';
      }
    });
  }
}
