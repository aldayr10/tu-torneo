import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TournamentService } from '../../../../services/tournament.service';
import { Tournament } from '../../../../models/tournament';
import { ProfileService } from '../../../../services/profile';
import { TournamentMatchService } from '../../../../services/tournament-match-service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth';
import { Match } from '../../../../models/match';

type TournamentView = Tournament & {
  rondas?: { numero: number; partidos: Match[] }[];
  totalPartidos?: number;
  totalEquipos?: number;
  matchesLoaded?: boolean;
};

@Component({
  selector: 'app-view-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-games.html',
  styleUrls: ['./view-games.css']
})
export class ViewGames implements OnInit {

  torneos: TournamentView[] = [];
  player: any;

  editingMatchId: number | null = null;
  scheduleDate = '';
  scheduleTime = '';

  // cierre de partido
  closingMatchId: number | null = null;
  closeScoreA: number | null = null;
  closeScoreB: number | null = null;
  closeWinnerTeamId: number | null = null;
  errorMessage = '';

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private matchService: TournamentMatchService,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: profile => {
        this.player = profile;
        this.cargarDatos();
      },
      error: () => this.cargarDatos(),
    });
  }

  goToDAshboard() {
    this.router.navigate(['/dashboard']);
  }

  cargarDatos() {
    const userId = this.authService.getCurrentUser()?.idUser;
    const all$ = this.tournamentService.getTournaments().pipe(catchError(() => of([] as Tournament[])));
    const mine$ = userId
      ? this.tournamentService.myTournamens(userId).pipe(catchError(() => of([] as Tournament[])))
      : of([] as Tournament[]);

    forkJoin([all$, mine$]).pipe(
      map(([all, mine]) => {
        const mapById = new Map<number, Tournament>();
        [...all, ...mine].forEach(t => mapById.set(t.idTournament, t));
        return Array.from(mapById.values());
      })
    ).subscribe(tournaments => {
      const playerId = this.player?.idPlayer;
      if (!playerId) {
        this.torneos = [];
        return;
      }

      const enCurso = tournaments.filter(t => t.estado === 'EN_CURSO');
      const misTorneos: TournamentView[] = enCurso.filter(t =>
        t.teams?.some(team => team.players?.some((p: any) => p.idPlayer === playerId))
      );

      this.torneos = misTorneos;
      misTorneos.forEach(torneo => this.loadMatches(torneo));
    });
  }

  loadMatches(torneo: TournamentView) {
    this.matchService.getMatchesByTournament(torneo.idTournament).subscribe({
      next: matches => this.applyMatches(torneo, matches),
      error: () => this.applyMatches(torneo, []),
    });
  }

  private applyMatches(torneo: TournamentView, matches: Match[]) {
    const grouped: Record<number, Match[]> = {};
    matches.forEach(match => {
      if (!grouped[match.round]) grouped[match.round] = [];
      grouped[match.round].push(match);
    });
    torneo.rondas = Object.keys(grouped)
      .map(r => ({ numero: Number(r), partidos: grouped[Number(r)] }))
      .sort((a, b) => a.numero - b.numero);
    torneo.totalPartidos = matches.length;
    torneo.totalEquipos = torneo.teams?.length || 0;
    torneo.matchesLoaded = true;
  }

  isOwner(torneo: TournamentView): boolean {
    return torneo.idOwner === this.authService.getCurrentUser()?.idUser;
  }

  canDraw(torneo: TournamentView): boolean {
    return this.isOwner(torneo) && torneo.estado === 'EN_CURSO' && (torneo.totalPartidos ?? 0) === 0 && torneo.matchesLoaded === true;
  }

  drawTournament(torneo: TournamentView) {
    if (!this.isOwner(torneo)) return;
    this.errorMessage = '';
    this.matchService.draw(torneo.idTournament).subscribe({
      next: matches => this.applyMatches(torneo, matches),
      error: err => this.errorMessage = err?.error?.message ?? 'No se pudo guardar el sorteo.',
    });
  }

  toggleScheduleEditor(torneo: TournamentView, match: Match) {
    if (!this.isOwner(torneo) || match.status === 'FINALIZADO') return;
    if (this.editingMatchId === match.idMatch) {
      this.editingMatchId = null;
      return;
    }
    this.editingMatchId = match.idMatch;
    this.scheduleDate = (match.scheduledDate as string) || '';
    this.scheduleTime = (match.scheduledTime as string) || '';
  }

  saveSchedule(torneo: TournamentView, match: Match) {
    if (!this.isOwner(torneo)) return;
    if (!this.scheduleDate || !this.scheduleTime) return;
    this.matchService.updateMatch(match.idMatch, {
      scheduledDate: this.scheduleDate,
      scheduledTime: this.scheduleTime,
    }).subscribe({
      next: updated => {
        Object.assign(match, updated);
        this.editingMatchId = null;
      },
      error: err => this.errorMessage = err?.error?.message ?? 'No se pudo guardar la programación.',
    });
  }

  cancelSchedule() {
    this.editingMatchId = null;
  }

  openCloseEditor(torneo: TournamentView, match: Match) {
    if (!this.isOwner(torneo) || match.status === 'FINALIZADO') return;
    this.closingMatchId = match.idMatch;
    this.closeScoreA = match.scoreA ?? 0;
    this.closeScoreB = match.scoreB ?? 0;
    this.closeWinnerTeamId = match.winnerTeamId ?? match.teamAId;
    this.errorMessage = '';
  }

  cancelClose() {
    this.closingMatchId = null;
  }

  saveClose(torneo: TournamentView, match: Match) {
    if (!this.isOwner(torneo)) return;
    if (this.closeScoreA == null || this.closeScoreB == null || this.closeWinnerTeamId == null) {
      this.errorMessage = 'Debes ingresar marcador y ganador.';
      return;
    }
    this.errorMessage = '';
    this.matchService.updateMatch(match.idMatch, {
      scoreA: Number(this.closeScoreA),
      scoreB: Number(this.closeScoreB),
      winnerTeamId: Number(this.closeWinnerTeamId),
    }).subscribe({
      next: updated => {
        Object.assign(match, updated);
        this.closingMatchId = null;
      },
      error: err => this.errorMessage = err?.error?.message ?? 'No se pudo cerrar el partido.',
    });
  }

  formatScheduled(date: string, time: string): string {
    const fecha = new Date(`${date}T${time}`);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    }) + ' · ' + fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
