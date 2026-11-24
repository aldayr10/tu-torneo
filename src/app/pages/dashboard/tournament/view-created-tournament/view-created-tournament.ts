import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ProfileService } from '../../../../services/profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ViewCreatedTeams } from '../../teams/view-created-teams/view-created-teams';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';



@Component({
  selector: 'app-view-created-tournament',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-tournament.html',
  styleUrl: './view-created-tournament.css',
})
export class ViewCreatedTournament {



  tournaments$ = new BehaviorSubject<Tournament[]>([]);
  gestion: any = true
  owner: any
  currentUserId: number | null = null;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private profile: ProfileService,
    private router:Router,
    private authService: AuthService,
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.idUser ?? null;
    this.profile.getProfile().subscribe({
      next: data => {
        this.owner = data;
        this.currentUserId = data?.idUser ?? this.currentUserId;
        this.loadMyTournaments();
      },
      error: () => this.loadMyTournaments(),
    });
  }

  

  loadMyTournaments(): void {
    const id = this.currentUserId ?? this.owner?.idUser;
    if (!id) return;
    this.tournamentService.myTournamens(id).subscribe({
      next: data => this.tournaments$.next(data),
      error: () => this.tournaments$.next([]),
    });
  }


  editTournament(tournament:Tournament) {
    this.router.navigate(['/info-tournament', tournament.idTournament]);
  }

  getPaginatedTeams(tournaments: Tournament[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return tournaments.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(tournaments: Tournament[]) {
    return Math.ceil(tournaments.length / this.itemsPerPage);
  }

  addTeamTournament(tournament: Tournament) {
    console.log(tournament);
    const dialogRef = this.dialog.open(ViewCreatedTeams, {
      data: {
        tournament: tournament,
        typeForm: -2,
      },
      width: '1000px',
    });
    console.log(dialogRef);
    alert('solo podras ver los equipos que sean de la misma categoria')
    
    dialogRef.afterClosed().subscribe(result => {

    });

  }

}