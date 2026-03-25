import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament';

@Component({
  selector: 'app-view-created-tournament',
  imports: [CommonModule],
  templateUrl: './view-created-tournament.html',
  styleUrl: './view-created-tournament.css',
})
export class ViewCreatedTournament implements OnInit {
  tournaments: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournaments = this.tournamentService.getTournaments();
  }

  openManageTournament(tournamentId: number): void {
    this.router.navigate(['/dashboard/tournament/manage', tournamentId]);
  }
}
