import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-tournament',
  templateUrl: './info-tournament.html',
  styleUrl: './info-tournament.css',
})
export class InfoTournament implements OnInit {

  tournament?: Tournament;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  goToDAshboard(){
    this.router.navigate(['/tournament']);
  }
  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tournamentService.getTournamentById(id)
      .subscribe(t => {
        this.tournament = t;
      });
  }

  canStart(): boolean {
    if (!this.tournament) return false;

    return (
      this.tournament.teams.length >= 2 &&
      this.tournament.estado === 'ABIERTO'
    );
  }

  startTournament() {
    if (!this.tournament || !this.canStart()) return;
    this.tournamentService.startTournament(this.tournament.idTournament).subscribe({
      next: tournament => {
        this.tournament = tournament;
        void this.router.navigate(['/view-games']);
      },
      error: (error) => {
        console.error('Error iniciando/sorteando torneo:', error);
        alert(error?.error?.message ?? 'No se pudo iniciar o sortear el torneo.');
      },
    });
  }

}
