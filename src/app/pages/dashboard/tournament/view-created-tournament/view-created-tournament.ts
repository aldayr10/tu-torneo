import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { Profile } from '../../../../services/profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTournament } from '../create-tournament/create-tournament';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-created-tournament',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-tournament.html',
  styleUrl: './view-created-tournament.css',
})
export class ViewCreatedTournament implements OnInit {

  @Input() typeForm!: number;
  tournaments$!: Observable<Tournament[]>;

  owner: any
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private profile: Profile,
    private router: Router
  ) {
    this.owner = this.profile.getProfile()
  }

  ngOnInit(): void {

    switch (this.typeForm) {
      case -1:
        this.loadMyTournaments();
        break;
      case -2:
        this.loadTournaments()
        break;
      default:


        break;
    }
  }

  loadMyTournaments(): void {
    this.tournaments$ = this.tournamentService.myTournamens(this.owner.idPlayer);
  }

  loadTournaments(): void {
    this.tournaments$ = this.tournamentService.getListRegistrationTournaments(this.owner.idPlayer);
  }
  

  editTournament() {

    const dialogRef = this.dialog.open(CreateTournament, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTournaments();
    });

  }

  getPaginatedTeams(tournaments: Tournament[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return tournaments.slice(start, start + this.itemsPerPage);
  }


  getTotalPages(tournaments: Tournament[]) {
    return Math.ceil(tournaments.length / this.itemsPerPage);
  }

}