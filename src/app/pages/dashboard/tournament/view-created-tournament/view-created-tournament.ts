import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ProfileService } from '../../../../services/profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTournament } from '../create-tournament/create-tournament';
import { BehaviorSubject } from 'rxjs';
import { ViewCreatedTeams } from '../../teams/view-created-teams/view-created-teams';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-created-tournament',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-tournament.html',
  styleUrl: './view-created-tournament.css',
})
export class ViewCreatedTournament {



  tournaments$ = new BehaviorSubject<Tournament[]>([]);
  gestion: any =true
  owner: any
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private profile: ProfileService,
    private router:Router
  ) {
    this.profile.getProfile().subscribe(data=>{
      this.owner=data
      this.loadMyTournaments()
    })
    
  }

  

  loadMyTournaments(): void {
    this.tournamentService.myTournamens(this.owner.idPlayer).subscribe(data=>{
      this.tournaments$.next(data);
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