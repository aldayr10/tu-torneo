// view-games.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TournamentService } from '../../../../services/tournament.service';
import { Tournament } from '../../../../models/tournament';
import { ProfileService } from '../../../../services/profile';
import { TeamService } from '../../../../services/team';
import { TournamentMatchService } from '../../../../services/tournament-match-service';
import { FormsModule } from '@angular/forms';

type TournamentView = Tournament & {
  rondas?: {
    numero: number;
    partidos: any[];
  }[];
  totalPartidos?: number;
  totalEquipos?: number;
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

  editingMatchId: string | null = null;
  scheduleDate = '';
  scheduleTime = '';

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private matchService: TournamentMatchService,
    private profileService: ProfileService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.player = profile;
      this.cargarDatos();
    });
  }

  goToDAshboard() {
    this.router.navigate(['/dashboard']);
  }

  cargarDatos() {
    this.tournamentService.getTournaments().subscribe(tournaments => {

      const enCurso = tournaments.filter(t => t.estado === 'EN_CURSO');

      const misTorneos: TournamentView[] = enCurso.filter(t =>
        t.teams?.some(team => {

          const fullTeam = this.teamService.getTeamByIdTeam(team.idTeam);

          if (!fullTeam?.players) return false;

          return fullTeam.players.some(
            p => p.idPlayer === this.player.idPlayer
          );

        })
      );

      misTorneos.forEach(torneo => {

        this.matchService.generateRounds(torneo);

        this.matchService.getMatchesByTournament(torneo.idTournament)
          .subscribe(matches => {

            const grouped: any = {};

            matches.forEach(match => {
              if (!grouped[match.round]) grouped[match.round] = [];
              grouped[match.round].push(match);
            });

            torneo.rondas = Object.keys(grouped)
              .map(r => ({
                numero: Number(r),
                partidos: grouped[r]
              }))
              .sort((a, b) => a.numero - b.numero);

            torneo.totalPartidos = torneo.rondas.reduce(
              (acc, r) => acc + r.partidos.length,
              0
            );

            torneo.totalEquipos = torneo.teams?.length || 0;
          });

      });

      this.torneos = misTorneos;
    });
  }

  toggleScheduleEditor(match: any) {
    if (this.editingMatchId === match.idMatch) {
      this.editingMatchId = null;
      return;
    }

    this.editingMatchId = match.idMatch;
    this.scheduleDate = match.scheduledDate || '';
    this.scheduleTime = match.scheduledTime || '';
  }

  saveSchedule(match: any) {
    if (!this.scheduleDate || !this.scheduleTime) return;

    match.scheduledDate = this.scheduleDate;
    match.scheduledTime = this.scheduleTime;

    // Persistencia opcional:
    // this.matchService.updateMatch(match).subscribe();

    this.editingMatchId = null;
  }

  cancelSchedule() {
    this.editingMatchId = null;
  }

  formatScheduled(date: string, time: string): string {
    const fecha = new Date(`${date}T${time}`);

    return fecha.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ' · ' +
      fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}