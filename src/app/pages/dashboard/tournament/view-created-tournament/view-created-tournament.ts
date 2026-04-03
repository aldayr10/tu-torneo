import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTournament } from '../create-tournament/create-tournament';

@Component({
  selector: 'app-view-created-tournament',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-tournament.html',
  styleUrl: './view-created-tournament.css',
})
export class ViewCreatedTournament implements OnInit {

  tournaments: Tournament[] = [];

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournaments = this.tournamentService.getTournaments();
  }

  createTournament() {

    const dialogRef = this.dialog.open(CreateTournament, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTournaments();
    });

  }

}