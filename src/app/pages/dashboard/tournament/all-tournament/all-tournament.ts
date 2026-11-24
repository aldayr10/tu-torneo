
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ProfileService } from '../../../../services/profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { DescriptionTournament } from '../../tournament/description-tournament/description-tournament';
import { SelectTeam } from '../../teams/select-team/select-team';
import { Team } from '../../../../models/team';
import { AuthService } from '../../../../services/auth';


@Component({
  selector: 'app-all-tournament',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './all-tournament.html',
  styleUrl: './all-tournament.css',
})

export class AllTournament implements OnInit {

  @Input() typeForm!: number;
  tournaments$!: Observable<Tournament[]>;
  gestion: any
  owner: any
  currentUserId: number | null = null;
  currentPage = 1;
  itemsPerPage = 6;
  containers: number = 3

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private profile: ProfileService,
    private router:Router,
    private authService: AuthService,
  ) {
    this.currentUserId = this.authService.getCurrentUser()?.idUser ?? null;
    this.profile.getProfile().subscribe(owner => {
      if (owner) {
        this.owner = owner;
        this.currentUserId = owner.idUser ?? this.currentUserId;
      }
      this.loadTournaments();
    });
  }

  ngOnInit(): void {
    this.gestion = false
    this.loadTournaments()
  }

  loadTournaments(): void {
    const userId = this.currentUserId ?? this.owner?.idUser;
    if (!userId) return;
    this.tournaments$ = this.tournamentService.getListRegistrationTournaments(userId);
  }

  groupedTournaments(tournaments: Tournament[]) {
    const groups = [];
    for (let i = 0; i < tournaments.length; i += 3) {
      groups.push(tournaments.slice(i, i + 3));
    }
    return groups;
  }

  getPaginatedTeams(tournaments: Tournament[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return tournaments.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(tournaments: Tournament[]) {
    return Math.ceil(tournaments.length / this.itemsPerPage);
  }

  openDescription(tournament: Tournament) {
    console.log(tournament);
    const dialogRef = this.dialog.open(DescriptionTournament, {
      data: {
        tournament: tournament,
      },
      width: '1000px',
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTeamTournament(tournament)
      }
    });

  }

  getTeamTournament(tournament: Tournament) {
    console.log(tournament);
    const dialogRef = this.dialog.open(SelectTeam, {
      data: {
        tournament: tournament,
      },
      width: '1000px',
    });
    console.log(dialogRef);
    alert('solo podras ver los equipos que sean de la misma categoria')

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const team: Team = result;
        this.addTeamTournament(tournament, team);
      }
    });
  }

  addTeamTournament(tournament: Tournament, team: Team) {

  this.tournamentService.addTeamToTournament(tournament, team).subscribe({
    next: () => {
      alert('Equipo inscrito con éxito.');
      this.loadTournaments();
    },
    error: (err) => alert(err?.error?.message || 'No se pudo inscribir el equipo en el torneo.'),
  });

}

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

}