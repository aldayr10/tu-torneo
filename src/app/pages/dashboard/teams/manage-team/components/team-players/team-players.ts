import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JoinTeam } from '../../../request/join-team/join-team';
import { TeamService } from '../../../../../../services/team';
import { AuthService } from '../../../../../../services/auth';
import { PlayerService } from '../../../../../../services/player';
import { Team } from '../../../../../../models/team';

@Component({
  selector: 'app-team-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-players.html',
  styleUrls: ['./team-players.css']
})
export class TeamPlayers implements OnInit, OnChanges {
  @Input() team!: Team;
  @Output() changed = new EventEmitter<void>();

  isOwner = false;
  myPlayerId: number | null = null;
  message = '';

  constructor(
    private dialog: MatDialog,
    private teamService: TeamService,
    private authService: AuthService,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.syncContext();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team']) {
      this.syncContext();
    }
  }

  private syncContext(): void {
    const user = this.authService.getCurrentUser();
    this.isOwner = !!user && !!this.team && user.idUser === this.team.ownerId;
    if (user) {
      this.playerService.getPlayerByIdUser(user.idUser).subscribe({
        next: (player: any) => this.myPlayerId = player?.idPlayer ?? null,
        error: () => this.myPlayerId = null,
      });
    }
  }

  openInvite() {
    this.dialog.open(JoinTeam, {
      width: '800px',
      data: { team: this.team }
    });
  }

  canRemove(player: any): boolean {
    if (!player) return false;
    if (this.isOwner) return true;
    return this.myPlayerId !== null && player.idPlayer === this.myPlayerId;
  }

  removePlayer(player: any): void {
    if (!this.team?.idTeam || !player?.idPlayer) return;
    this.teamService.removePlayerFromTeam(this.team.idTeam, player.idPlayer).subscribe({
      next: () => {
        this.message = 'Jugador eliminado del equipo.';
        this.changed.emit();
      },
      error: (err: any) => {
        this.message = err?.error?.message || 'No se pudo eliminar al jugador.';
      }
    });
  }
}
